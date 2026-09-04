/**
 * Haversine distance — authoritative fallback when MySQL spatial index unavailable
 * or for unit tests. Production marketplace uses MySQL ST_Distance_Sphere + bounding box.
 */
export function haversineKm(
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number },
): number {
  const R = 6371;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const lat1 = rad(a.latitude);
  const lat2 = rad(b.latitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function rad(d: number) {
  return (d * Math.PI) / 180;
}

/**
 * Bounding box (approx) for pre-filtering providers before precise haversine.
 * Returns { minLat, maxLat, minLng, maxLng } for radiusKm around center.
 */
export function boundingBox(center: { latitude: number; longitude: number }, radiusKm: number) {
  const latDelta = radiusKm / 111.0;
  const lngDelta = radiusKm / (111.0 * Math.cos((center.latitude * Math.PI) / 180));
  return {
    minLat: center.latitude - latDelta,
    maxLat: center.latitude + latDelta,
    minLng: center.longitude - lngDelta,
    maxLng: center.longitude + lngDelta,
  };
}
