import { prisma } from '../../config/prisma';

export interface MarketplaceConfig {
  default_discovery_radius_km: number;
  max_discovery_radius_km: number;
  allowed_customer_radii_km: number[];
  allowed_provider_coverages_km: number[];
  max_provider_coverage_km: number;
}

// DB-backed, with fallback to blueprint defaults if admin_settings not seeded yet
const DEFAULTS: MarketplaceConfig = {
  default_discovery_radius_km: 10,
  max_discovery_radius_km: 20,
  allowed_customer_radii_km: [10, 15, 20],
  allowed_provider_coverages_km: [10, 15, 20],
  max_provider_coverage_km: 20,
};

export async function getMarketplaceConfig(): Promise<MarketplaceConfig> {
  try {
    const rows = await prisma.adminSetting.findMany({
      where: {
        settingKey: {
          in: [
            'default_discovery_radius_km',
            'max_discovery_radius_km',
            'allowed_customer_radii_km',
            'allowed_provider_coverages_km',
            'max_provider_coverage_km',
          ],
        },
      },
    });
    if (rows.length === 0) return DEFAULTS;

    const map = new Map(rows.map((r) => [r.settingKey, r.settingValue]));
    const parseNum = (k: string, fallback: number) => {
      const v = map.get(k);
      if (!v) return fallback;
      const n = Number(v);
      return Number.isFinite(n) ? n : fallback;
    };
    const parseJson = (k: string, fallback: number[]) => {
      const v = map.get(k);
      if (!v) return fallback;
      try {
        const arr = JSON.parse(v);
        return Array.isArray(arr) ? arr.map(Number).filter((n) => Number.isFinite(n)) : fallback;
      } catch {
        return fallback;
      }
    };

    return {
      default_discovery_radius_km: parseNum('default_discovery_radius_km', DEFAULTS.default_discovery_radius_km),
      max_discovery_radius_km: parseNum('max_discovery_radius_km', DEFAULTS.max_discovery_radius_km),
      allowed_customer_radii_km: parseJson('allowed_customer_radii_km', DEFAULTS.allowed_customer_radii_km),
      allowed_provider_coverages_km: parseJson(
        'allowed_provider_coverages_km',
        DEFAULTS.allowed_provider_coverages_km,
      ),
      max_provider_coverage_km: parseNum('max_provider_coverage_km', DEFAULTS.max_provider_coverage_km),
    };
  } catch {
    // DB unavailable (e.g., tests without DB) — return blueprint defaults; never throw
    return DEFAULTS;
  }
}
