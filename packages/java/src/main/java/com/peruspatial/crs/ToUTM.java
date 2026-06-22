package com.peruspatial.crs;

import com.peruspatial.data.CrsData;

public final class ToUTM {
  private ToUTM() {}

  public static UtmResult toUTM(double lat, double lng) {
    int zone = UtmZoneFor.utmZoneFor(lng);
    CrsData.Zone zoneDef = null;
    for (CrsData.Zone z : CrsData.ZONES) {
      if (z.zone() == zone) {
        zoneDef = z;
        break;
      }
    }
    double centralMeridian = zoneDef != null ? zoneDef.centralMeridian() : (zone - 1) * 6 - 180 + 3;
    int epsg = zoneDef != null ? zoneDef.epsg() : 32700 + zone;

    double a = CrsData.A;
    double f = CrsData.F;
    double k0 = CrsData.K0;
    double e2 = f * (2 - f);
    double ep2 = e2 / (1 - e2);

    double phi = Math.toRadians(lat);
    double lambda = Math.toRadians(lng);
    double lambda0 = Math.toRadians(centralMeridian);

    double sinPhi = Math.sin(phi);
    double cosPhi = Math.cos(phi);
    double tanPhi = Math.tan(phi);

    double N = a / Math.sqrt(1 - e2 * sinPhi * sinPhi);
    double T = tanPhi * tanPhi;
    double C = ep2 * cosPhi * cosPhi;
    double A0 = cosPhi * (lambda - lambda0);

    double M = a * ((1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * phi
        - (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) * Math.sin(2 * phi)
        + (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * Math.sin(4 * phi)
        - (35 * e2 * e2 * e2 / 3072) * Math.sin(6 * phi));

    double easting = k0 * N * (A0 + (1 - T + C) * Math.pow(A0, 3) / 6
        + (5 - 18 * T + T * T + 72 * C - 58 * ep2) * Math.pow(A0, 5) / 120)
        + CrsData.FALSE_EASTING;

    double northing = k0 * (M + N * tanPhi * (A0 * A0 / 2
        + (5 - T + 9 * C + 4 * C * C) * Math.pow(A0, 4) / 24
        + (61 - 58 * T + T * T + 600 * C - 330 * ep2) * Math.pow(A0, 6) / 720));

    northing += CrsData.FALSE_NORTHING_SOUTH;

    long e = Math.round(easting);
    long n = Math.round(northing);
    return new UtmResult(zone, "S", epsg, e, n);
  }
}
