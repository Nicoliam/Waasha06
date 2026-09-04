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

  // Optional category validation
  if (categoryId) {
    const cat = await prisma.serviceCategory.findUnique({ where: { id: categoryId } }).catch(() => null);
    // Also allow lookup by code for frontend convenience
    if (!cat) {
      const byCode = await prisma.serviceCategory.findUnique({ where: { code: categoryId } }).catch(() => null);
      if (!byCode) {
        return res.status(422).json({
          success: false,
          error: { code: 'INVALID_CATEGORY', message: 'Invalid categoryId' },
        });
      }
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
          coverageRadiusKm: true,
          status: true,
          tierId: true,
        },
      },
    },
    take: 500, // hard cap before precise filter
  });

  // Precise BOTH rule: distance <= customer radius AND distance <= provider coverage
  // distance never exceeds 20 km path due to customer radius validation above
  const results = [];
  for (const loc of locations) {
    const distanceKm = haversineKm({ latitude, longitude }, { latitude: loc.latitude, longitude: loc.longitude });
    // Extra guard: distance must never exceed max (20) even if DB had stale wide box
    if (distanceKm > config.max_discovery_radius_km) continue;
    if (distanceKm > radiusKm) continue; // customer radius
    if (distanceKm > loc.provider.coverageRadiusKm) continue; // provider coverage — BOTH rule

    // Optional: if categoryId supplied, ensure provider has at least one active service in that category
    if (categoryId) {
      // Resolve category code/id to id
      let catId = categoryId;
      const byCode = await prisma.serviceCategory.findUnique({ where: { code: categoryId } }).catch(() => null);
      if (byCode) catId = byCode.id;
      // Simple existence check — could be optimized with join
      const hasService = await prisma.service.findFirst({
        where: {
          providerId: loc.provider.id,
          serviceCategoryId: catId,
          status: 'ACTIVE',
        },
        select: { id: true },
      });
      if (!hasService) continue;
    }

    results.push({
      id: loc.provider.id,
      displayName: loc.provider.displayName ?? 'Provider',
      latitude: loc.latitude,
      longitude: loc.longitude,
      coverageRadiusKm: loc.provider.coverageRadiusKm,
      distanceKm: Math.round(distanceKm * 10) / 10,
      // Minimal card fields — extended fields added in later slices
    });
  }

  // Sort by distance ascending (marketplace equality — no tier boost)
  results.sort((a, b) => a.distanceKm - b.distanceKm);

  const total = results.length;
  const start = (page - 1) * perPage;
  const paged = results.slice(start, start + perPage);

  return res.json({
    success: true,
    data: paged,
    meta: { page, perPage, total, radiusKm },
  });
});

export default router;
