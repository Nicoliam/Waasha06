/**
 * Waasha Discovery Radius Model — apps/mobile/src/app/core/models/discovery-radius.model.ts
 *
 * Customer discovery + Provider service coverage.
 * Backend is authoritative for eligibility and radius validation.
 * Client must NOT hard-code 10/15/20 as security enforcement.
 * Client uses backend-provided configuration to render options.
 *
 * Blueprint preservation:
 * - Default 10 km (docs/WAASHA_PRODUCTION_BLUEPRINT_MASTER.md — default_discovery_radius_km)
 * - Max 20 km absolute (new requirement)
 * - Provider coverage respected via BOTH check
 * - No Driver Network
 */

/** Allowed customer discovery radii (km) — mirrors backend enum. */
export type CustomerDiscoveryRadiusKm = 10 | 15 | 20;

/** Allowed provider service coverage radii (km). */
export type ProviderCoverageRadiusKm = 10 | 15 | 20;

/**
 * Backend-provided marketplace radius configuration.
 * Fetched from `GET /api/v1/marketplace/config` or `admin_settings`.
 * Client treats this as source of truth for rendering — not for security enforcement.
 */
export interface MarketplaceRadiusConfig {
  /** Default customer discovery radius — 10 */
  readonly defaultCustomerRadiusKm: CustomerDiscoveryRadiusKm;
  /** Absolute maximum customer discovery radius — 20 */
  readonly maxCustomerRadiusKm: CustomerDiscoveryRadiusKm;
  /** Ordered allowed values for customer expansion — [10, 15, 20] */
  readonly allowedCustomerRadiiKm: readonly CustomerDiscoveryRadiusKm[];
  /** Allowed values for provider coverage — [10, 15, 20] */
  readonly allowedProviderCoveragesKm: readonly ProviderCoverageRadiusKm[];
  /** Absolute maximum provider coverage — 20 */
  readonly maxProviderCoverageKm: ProviderCoverageRadiusKm;
}

/**
 * Fallback config — pre-backend-load UX only.
 * Display placeholder until GET /api/v1/marketplace/config resolves.
 * NOT a security boundary: backend independently validates radius_km ≤ max (20)
 * and provider coverage, and is authoritative for marketplace filtering.
 * Values mirror backend defaults for visual consistency only.
 */
export const FALLBACK_MARKETPLACE_RADIUS_CONFIG: MarketplaceRadiusConfig = {
  defaultCustomerRadiusKm: 10,
  maxCustomerRadiusKm: 20,
  allowedCustomerRadiiKm: [10, 15, 20] as const,
  allowedProviderCoveragesKm: [10, 15, 20] as const,
  maxProviderCoverageKm: 20,
} as const;

/** Customer location context for discovery queries. */
export interface CustomerLocation {
  readonly latitude: number;
  readonly longitude: number;
}

/** Provider location + coverage for eligibility checks. */
export interface ProviderCoverage {
  readonly providerId: string;
  /** Provider's configured service coverage radius — 10 | 15 | 20 */
  readonly coverageRadiusKm: ProviderCoverageRadiusKm;
  readonly latitude: number;
  readonly longitude: number;
}

/** Marketplace eligibility result — computed client-side for UX preview only. */
export interface MarketplaceEligibility {
  readonly distanceKm: number;
  readonly customerRadiusKm: CustomerDiscoveryRadiusKm;
  readonly providerCoverageKm: ProviderCoverageRadiusKm;
  readonly withinCustomerRadius: boolean;
  readonly withinProviderCoverage: boolean;
  /** True only if BOTH checks pass */
  readonly eligible: boolean;
  readonly reason?: string;
}

/** Radius expansion state — derived from backend allowedCustomerRadiiKm, not hard-coded branches. */
export interface RadiusExpansionState {
  readonly currentRadiusKm: CustomerDiscoveryRadiusKm;
  readonly canExpandTo: CustomerDiscoveryRadiusKm | null;
  readonly atMax: boolean;
}

/** Query params for `GET /marketplace/providers` — radius is validated backend-side. */
export interface MarketplaceProvidersQuery {
  readonly latitude: number;
  readonly longitude: number;
  /** Customer-selected discovery radius — backend validates ≤ max */
  readonly radiusKm: CustomerDiscoveryRadiusKm;
  readonly categoryId?: string;
  readonly page?: number;
  readonly perPage?: number;
}
