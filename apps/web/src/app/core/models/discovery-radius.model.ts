export type CustomerDiscoveryRadiusKm = 10 | 15 | 20;
export type ProviderCoverageRadiusKm = 10 | 15 | 20;

export interface MarketplaceRadiusConfig {
  readonly defaultCustomerRadiusKm: CustomerDiscoveryRadiusKm;
  readonly maxCustomerRadiusKm: CustomerDiscoveryRadiusKm;
  readonly allowedCustomerRadiiKm: readonly CustomerDiscoveryRadiusKm[];
  readonly allowedProviderCoveragesKm: readonly ProviderCoverageRadiusKm[];
  readonly maxProviderCoverageKm: ProviderCoverageRadiusKm;
}

export const FALLBACK_MARKETPLACE_RADIUS_CONFIG: MarketplaceRadiusConfig = {
  defaultCustomerRadiusKm: 10,
  maxCustomerRadiusKm: 20,
  allowedCustomerRadiiKm: [10, 15, 20] as const,
  allowedProviderCoveragesKm: [10, 15, 20] as const,
  maxProviderCoverageKm: 20,
} as const;

export interface CustomerLocation {
  readonly latitude: number;
  readonly longitude: number;
}

export interface ProviderCoverage {
  readonly providerId: string;
  readonly coverageRadiusKm: ProviderCoverageRadiusKm;
  readonly latitude: number;
  readonly longitude: number;
}

export interface MarketplaceEligibility {
  readonly distanceKm: number;
  readonly customerRadiusKm: CustomerDiscoveryRadiusKm;
  readonly providerCoverageKm: ProviderCoverageRadiusKm;
  readonly withinCustomerRadius: boolean;
  readonly withinProviderCoverage: boolean;
  readonly eligible: boolean;
  readonly reason?: string;
}

export interface RadiusExpansionState {
  readonly currentRadiusKm: CustomerDiscoveryRadiusKm;
  readonly canExpandTo: CustomerDiscoveryRadiusKm | null;
  readonly atMax: boolean;
}

export interface MarketplaceProvidersQuery {
  readonly latitude: number;
  readonly longitude: number;
  readonly radiusKm: CustomerDiscoveryRadiusKm;
  readonly categoryId?: string;
  readonly page?: number;
  readonly perPage?: number;
}

export interface ServiceCategory {
  id: string;
  code: string;
  name: string;
  icon?: string | null;
  sortOrder?: number;
}

export interface ProviderCardDto {
  id: string;
  displayName: string;
  bio?: string | null;
  profileImageUrl?: string | null;
  tierCode?: string | null;
  tierName?: string | null;
  verificationStatus?: string | null;
  latitude: number;
  longitude: number;
  city?: string | null;
  province?: string | null;
  coverageRadiusKm: number;
  distanceKm: number;
  rating?: number | null;
  reviewCount?: number;
  startingPrice?: number | null;
  categories?: string[];
}

export interface ServiceImageDto {
  id: string;
  imageUrl: string;
  sortOrder: number;
}

export interface ServiceDto {
  id: string;
  uuid: string;
  name: string;
  description?: string | null;
  price: number;
  currency: string;
  durationMinutes: number;
  serviceMode: string;
  status: string;
  category?: { id: string; code: string; name: string } | null;
  images: ServiceImageDto[];
}

export interface ProviderProfileDto {
  id: string;
  displayName: string;
  bio?: string | null;
  profileImageUrl?: string | null;
  experienceSummary?: string | null;
  tier?: { code: string; name: string } | null;
  tierCode?: string | null;
  verificationStatus: string;
  status: string;
  coverageRadiusKm: number;
  customRequestsEnabled: boolean;
  location?: {
    city?: string | null;
    province?: string | null;
    latitude: number;
    longitude: number;
    isPrimary: boolean;
  } | null;
  distanceKm?: number | null;
  rating?: number | null;
  reviewCount: number;
  reviewsSample: Array<{ rating: number; comment: string | null; createdAt: string }>;
  isAvailable: boolean;
  services: ServiceDto[];
}
