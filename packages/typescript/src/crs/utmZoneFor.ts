export function utmZoneFor(lng: number): number {
  if (lng >= -84 && lng < -78) {
    return 17;
  }
  if (lng >= -78 && lng < -72) {
    return 18;
  }
  if (lng >= -72 && lng < -66) {
    return 19;
  }
  return Math.floor((lng + 180) / 6) + 1;
}
