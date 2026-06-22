import { utmData } from "./data";
import { utmZoneFor } from "./utmZoneFor";
import type { UtmResult } from "../types";

const DEG = Math.PI / 180;

export function toUTM(lat: number, lng: number): UtmResult {
  const { a, f, k0, falseEasting, falseNorthingSouth } = utmData.ellipsoid;
  const zone = utmZoneFor(lng);
  const lambda0 = (zone * 6 - 183) * DEG;

  const e2 = f * (2 - f);
  const ep2 = e2 / (1 - e2);

  const phi = lat * DEG;
  const lambda = lng * DEG;

  const sinPhi = Math.sin(phi);
  const cosPhi = Math.cos(phi);
  const tanPhi = Math.tan(phi);

  const N = a / Math.sqrt(1 - e2 * sinPhi * sinPhi);
  const T = tanPhi * tanPhi;
  const C = ep2 * cosPhi * cosPhi;
  const A = cosPhi * (lambda - lambda0);

  const M =
    a *
    ((1 - e2 / 4 - (3 * e2 * e2) / 64 - (5 * e2 * e2 * e2) / 256) * phi -
      ((3 * e2) / 8 + (3 * e2 * e2) / 32 + (45 * e2 * e2 * e2) / 1024) *
        Math.sin(2 * phi) +
      ((15 * e2 * e2) / 256 + (45 * e2 * e2 * e2) / 1024) * Math.sin(4 * phi) -
      ((35 * e2 * e2 * e2) / 3072) * Math.sin(6 * phi));

  const A2 = A * A;
  const A3 = A2 * A;
  const A4 = A3 * A;
  const A5 = A4 * A;
  const A6 = A5 * A;

  const easting =
    k0 *
      N *
      (A +
        ((1 - T + C) * A3) / 6 +
        ((5 - 18 * T + T * T + 72 * C - 58 * ep2) * A5) / 120) +
    falseEasting;

  let northing =
    k0 *
    (M +
      N *
        tanPhi *
        (A2 / 2 +
          ((5 - T + 9 * C + 4 * C * C) * A4) / 24 +
          ((61 - 58 * T + T * T + 600 * C - 330 * ep2) * A6) / 720));

  northing += falseNorthingSouth;

  return {
    zone,
    hemisphere: "S",
    epsg: 32700 + zone,
    easting: Math.round(easting),
    northing: Math.round(northing),
  };
}
