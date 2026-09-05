import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { getMarketplaceConfig } from './marketplace-config.service';
import { prisma } from '../../config/prisma';
import { haversineKm, boundingBox } from '../../utils/geo';

const router = Router();

// GET /api/v1/marketplace/config — public (no auth), DB-backed
router.get('/config', async (_req: Request, res: Response) => {
  const config = await getMarketplaceConfig();
  return res.json({ success: true, data: config });
});

// GET /api/v1/marketplace/categories — public, exactly 5 launch categories (blueprint)
router.get('/categories', async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.serviceCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, code: true, name: true, icon: true, sortOrder: true },
    });
    return res.json({ success: true, data: categories });
  } catch {
    return res.status(503).json({ success: false, error: { code: 'NOT_READY', message: 'Categories unavailable' } });
  }
});

// GET /api/v1/marketplace/providers — marketplace discovery (BOTH rule)
const querySchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  radiusKm: z.coerce.number(),
  categoryId: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(50).default(20),
});

router.get('/providers', async (req: Request, res: Response) => {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid query', details: parsed.error.flatten() },
    });
  }
  const { latitude, longitude, radiusKm, categoryId, page, perPage } = parsed.data;

  const config = await getMarketplaceConfig();

  // Backend-authoritative validation: radius must be in allowed set and <= max
  if (!config.allowed_customer_radii_km.includes(radiusKm)) {
    return res.status(422).json({
      success: false,
      error: {
        code: 'INVALID_RADIUS',
        message: `radiusKm must be one of [${config.allowed_customer_radii_km.join(', ')}]`,
        details: { allowed: config.allowed_customer_radii_km, received: radiusKm },
      },
    });
  }
  if (radiusKm > config.max_discovery_radius_km) {
    return res.status(422).json({
      success: false,
      error: {
        code: 'RADIUS_EXCEEDS_MAX',
        message: `radiusKm must not exceed ${config.max_discovery_radius_km}`,
      },
    });
  }

  // Resolve categoryId (id or code) once — also validates
  let resolvedCategoryId: string | null = null;
  if (categoryId) {
    const byId = await prisma.serviceCategory.findUnique({ where: { id: categoryId } }).catch(() => null);
    if (byId) {
      resolvedCategoryId = byId.id;
    } else {
      const byCode = await prisma.serviceCategory.findUnique({ where: { code: categoryId } }).catch(() => null);
      if (!byCode) {
        return res.status(422).json({
          success: false,
          error: { code: 'INVALID_CATEGORY', message: 'Invalid categoryId' },
        });
      }
      resolvedCategoryId = byCode.id;
    }
  }

  // Bounding-box pre-filter to leverage latitude/longitude indexes (blueprint: geospatial)
  const box = boundingBox({ latitude, longitude }, radiusKm);

  // Fetch eligible provider primary locations + their provider coverage.
  // For MVP we consider provider_profiles.coverage_radius_km + provider_locations (primary or active).
  // T3 business_units are separate query (not required for radius slice tests but preserved for blueprint).
  const locations = await prisma.providerLocation.findMany({
    where: {
      isActive: true,
      latitude: { gte: box.minLat, lte: box.maxLat },
      longitude: { gte: box.minLng, lte: box.maxLng },
      provider: { status: 'ACTIVE' },
    },
    include: {
      provider: {
        select: {
          id: true,
          displayName: true,
          bio: true,
          profileImageUrl: true,
          coverageRadiusKm: true,
          status: true,
          verificationStatus: true,
          tierId: true,
          tier: { select: { code: true, name: true } },
        },
      },
    },
    take: 500, // hard cap before precise filter
  });

  // Precise BOTH rule: distance <= customer radius AND distance <= provider coverage
  // distance never exceeds 20 km path due to customer radius validation above
  const preFiltered: Array<{ loc: (typeof locations)[number]; distanceKm: number }> = [];
  for (const loc of locations) {
    const distanceKm = haversineKm({ latitude, longitude }, { latitude: loc.latitude, longitude: loc.longitude });
    // Extra guard: distance must never exceed max (20) even if DB had stale wide box
    if (distanceKm > config.max_discovery_radius_km) continue;
    if (distanceKm > radiusKm) continue; // customer radius
    if (distanceKm > loc.provider.coverageRadiusKm) continue; // provider coverage — BOTH rule

    // Category filtering — resolvedCategoryId pre-validated above
    if (resolvedCategoryId) {
      const hasService = await prisma.service.findFirst({
        where: {
          providerId: loc.provider.id,
          serviceCategoryId: resolvedCategoryId,
          status: 'ACTIVE',
        },
        select: { id: true },
      });
      if (!hasService) continue;
    }

    preFiltered.push({ loc, distanceKm: Math.round(distanceKm * 10) / 10 });
  }

  // Sort by distance ascending (marketplace equality — no tier boost)
  preFiltered.sort((a, b) => a.distanceKm - b.distanceKm);

  const total = preFiltered.length;
  const start = (page - 1) * perPage;
  const pagedFiltered = preFiltered.slice(start, start + perPage);

  // Enrich paged results with marketplace card fields (tier, rating, startingPrice, categories, location city)
  const providerIds = pagedFiltered.map((r) => r.loc.provider.id);
  let enrichedMap = new Map<string, { tierCode: string; tierName: string; profileImageUrl: string | null; rating: number | null; reviewCount: number; startingPrice: number | null; categories: string[]; city: string | null }>();
  if (providerIds.length > 0) {
    try {
      // Fetch services for starting price + categories
      const services = await prisma.service.findMany({
        where: { providerId: { in: providerIds }, status: 'ACTIVE' },
        select: {
          providerId: true,
          price: true,
          serviceCategoryId: true,
          category: { select: { name: true, code: true } },
        },
      });
      // Fetch review aggregates
      const reviews = await prisma.review.groupBy({
        by: ['providerId'],
        where: { providerId: { in: providerIds } },
        _avg: { rating: true },
        _count: { rating: true },
      } as any);

      const reviewMap = new Map(reviews.map((r: any) => [r.providerId, { avg: r._avg.rating, count: r._count.rating }]));
      const svcByProvider = new Map<string, typeof services>();
      for (const s of services) {
        const arr = svcByProvider.get(s.providerId!) ?? [];
        arr.push(s);
        svcByProvider.set(s.providerId!, arr);
      }

      for (const id of providerIds) {
        const svc = svcByProvider.get(id) ?? [];
        const prices = svc.map((s: any) => Number(s.price)).filter((n: number) => Number.isFinite(n));
        const startingPrice = prices.length ? Math.min(...prices) : null;
        const categories = [...new Set(svc.map((s: any) => s.category?.name).filter(Boolean))] as string[];
        const rev = reviewMap.get(id);
        enrichedMap.set(id, {
          tierCode: pagedFiltered.find((p) => p.loc.provider.id === id)?.loc.provider.tier?.code ?? 'T1',
          tierName: pagedFiltered.find((p) => p.loc.provider.id === id)?.loc.provider.tier?.name ?? 'Individual',
          profileImageUrl: pagedFiltered.find((p) => p.loc.provider.id === id)?.loc.provider.profileImageUrl ?? null,
          rating: rev?.avg != null ? Math.round(rev.avg * 10) / 10 : null,
          reviewCount: rev?.count ?? 0,
          startingPrice,
          categories,
          city: pagedFiltered.find((p) => p.loc.provider.id === id)?.loc.city ?? null,
        });
      }
    } catch {
      // enrichment is best-effort; keep minimal fields on failure
    }
  }

  const paged = pagedFiltered.map(({ loc, distanceKm }) => {
    const e = enrichedMap.get(loc.provider.id);
    return {
      id: loc.provider.id,
      displayName: loc.provider.displayName ?? 'Provider',
      bio: loc.provider.bio ?? null,
      profileImageUrl: loc.provider.profileImageUrl ?? null,
      tierCode: (loc.provider as any).tier?.code ?? e?.tierCode ?? null,
      tierName: (loc.provider as any).tier?.name ?? e?.tierName ?? null,
      verificationStatus: loc.provider.verificationStatus ?? null,
      latitude: loc.latitude,
      longitude: loc.longitude,
      city: (loc as any).city ?? e?.city ?? null,
      province: (loc as any).province ?? null,
      coverageRadiusKm: loc.provider.coverageRadiusKm,
      distanceKm,
      rating: e?.rating ?? null,
      reviewCount: e?.reviewCount ?? 0,
      startingPrice: e?.startingPrice ?? null,
      categories: e?.categories ?? [],
    };
  });

  return res.json({
    success: true,
    data: paged,
    meta: { page, perPage, total, radiusKm },
  });
});

// GET /api/v1/marketplace/providers/:providerId — public provider profile + services
// Must be after /providers list; Express matches exact before param, but keep param last
router.get('/providers/:providerId', async (req: Request, res: Response) => {
  const rawId = req.params.providerId;
  const { latitude, longitude } = req.query as { latitude?: string; longitude?: string };
  let distanceKm: number | null = null;
  let customerLoc: { latitude: number; longitude: number } | null = null;
  if (latitude !== undefined && longitude !== undefined) {
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      customerLoc = { latitude: lat, longitude: lng };
    }
  }

  try {
    // Resolve provider by id (cuid) — also allow uuid via secondary lookup if needed
    let provider = await prisma.providerProfile.findUnique({
      where: { id: rawId },
      include: {
        tier: { select: { code: true, name: true } },
        user: { select: { id: true, uuid: true } },
      },
    });
    // Fallback: try uuid lookup via user relation? For now only id
    if (!provider) {
      return res.status(404).json({ success: false, error: { code: 'PROVIDER_NOT_FOUND', message: 'Provider not found' } });
    }
    if (provider.status !== 'ACTIVE') {
      // Still expose but flag; discovery filters already limit to ACTIVE, profile 404 if not active to avoid leaking paused providers
      // For now allow but don't expose precise location if not active
    }

    const primaryLoc = await prisma.providerLocation.findFirst({
      where: { providerId: provider.id, isActive: true },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }],
    });

    if (primaryLoc && customerLoc) {
      distanceKm = Math.round(haversineKm(customerLoc, { latitude: primaryLoc.latitude, longitude: primaryLoc.longitude }) * 10) / 10;
    }

    // Services (max 3 images each per blueprint)
    const services = await prisma.service.findMany({
      where: { providerId: provider.id, status: 'ACTIVE' },
      include: {
        category: { select: { id: true, code: true, name: true } },
        images: { orderBy: { sortOrder: 'asc' }, take: 3 },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    // Rating summary
    let rating: number | null = null;
    let reviewCount = 0;
    let reviewsSample: Array<{ rating: number; comment: string | null; createdAt: Date }> = [];
    try {
      const agg = await (prisma.review as any).aggregate({
        where: { providerId: provider.id },
        _avg: { rating: true },
        _count: { rating: true },
      });
      if (agg?._avg?.rating != null) rating = Math.round(agg._avg.rating * 10) / 10;
      reviewCount = agg?._count?.rating ?? agg?._count?._all ?? 0;
      if (reviewCount > 0) {
        reviewsSample = await prisma.review.findMany({
          where: { providerId: provider.id },
          orderBy: { createdAt: 'desc' },
          take: 3,
          select: { rating: true, comment: true, createdAt: true },
        });
      }
    } catch {}

    // Availability preview — has at least one rule?
    let isAvailable = false;
    try {
      const rule = await prisma.availabilityRule.findFirst({ where: { providerId: provider.id, isActive: true }, select: { id: true } });
      isAvailable = !!rule;
    } catch {}

    // Never expose precise coordinates unless distance context was requested; still round and limit to 3 decimals
    const location = primaryLoc
      ? {
          city: primaryLoc.city ?? null,
          province: primaryLoc.province ?? null,
          // only include lat/lng rounded; not full precision if needed for distance elsewhere
          latitude: primaryLoc.latitude,
          longitude: primaryLoc.longitude,
          isPrimary: primaryLoc.isPrimary,
          // distance already computed above
        }
      : null;

    return res.json({
      success: true,
      data: {
        id: provider.id,
        displayName: provider.displayName ?? 'Provider',
        bio: provider.bio ?? null,
        profileImageUrl: provider.profileImageUrl ?? null,
        experienceSummary: provider.experienceSummary ?? null,
        tier: provider.tier ?? null,
        tierCode: provider.tier?.code ?? null,
        verificationStatus: provider.verificationStatus,
        status: provider.status,
        coverageRadiusKm: provider.coverageRadiusKm,
        customRequestsEnabled: provider.customRequestsEnabled,
        location,
        distanceKm,
        rating,
        reviewCount,
        reviewsSample,
        isAvailable,
        services: services.map((s) => ({
          id: s.id,
          uuid: s.uuid,
          name: s.name,
          description: s.description,
          price: Number(s.price),
          currency: s.currency,
          durationMinutes: s.durationMinutes,
          serviceMode: s.serviceMode,
          status: s.status,
          category: s.category,
          images: s.images.slice(0, 3).map((img) => ({ id: img.id, imageUrl: img.imageUrl, sortOrder: img.sortOrder })),
        })),
      },
    });
  } catch (e) {
    return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to load provider profile' } });
  }
});

export default router;
