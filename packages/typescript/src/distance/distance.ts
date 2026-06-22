import type { Position } from "../types";

const R = 6371.0088;
const DEG = Math.PI / 180;

export function distance(a: Position, b: Position): number {
  const [lng1, lat1] = a;
  const [lng2, lat2] = b;

  const dLat = (lat2 - lat1) * DEG;
  const dLng = (lng2 - lng1) * DEG;

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const h =
    sinDLat * sinDLat +
    Math.cos(lat1 * DEG) * Math.cos(lat2 * DEG) * sinDLng * sinDLng;

  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}
