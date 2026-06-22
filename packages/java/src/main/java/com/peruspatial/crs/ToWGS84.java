package com.peruspatial.crs;

import com.peruspatial.data.CrsData;

public final class ToWGS84 {
  private ToWGS84() {}

  public static Wgs84Result toWGS84(double easting, double northing, int zone) {
    double centralMeridian = (zone - 1) * 6 - 180 + 3;
    for (CrsData.Zone z : CrsData.ZONES) {
      if (z.zone() == zone) {
        centralMeridian = z.centralMeridian();
        break;
      }
    }

    double a = CrsData.A;
    double f = CrsData.F;
    double k0 = CrsData.K0;
    double e2 = f * (2 - f);
    double ep2 = e2 / (1 - e2);

    double x = easting - CrsData.FALSE_EASTING;
    double y = northing - CrsData.FALSE_NORTHING_SOUTH;

    double M = y / k0;
    double mu = M / (a * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256));

    double e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));

    double phi1 = mu
        + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu)
        + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu)
        + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu)
        + (1097 * e1 * e1 * e1 * e1 / 512) * Math.sin(8 * mu);

    double sinPhi1 = Math.sin(phi1);
    double cosPhi1 = Math.cos(phi1);
    double tanPhi1 = Math.tan(phi1);

    double N1 = a / Math.sqrt(1 - e2 * sinPhi1 * sinPhi1);
    double T1 = tanPhi1 * tanPhi1;
    double C1 = ep2 * cosPhi1 * cosPhi1;
    double R1 = a * (1 - e2) / Math.pow(1 - e2 * sinPhi1 * sinPhi1, 1.5);
    double D = x / (N1 * k0);

    double phi = phi1 - (N1 * tanPhi1 / R1) * (D * D / 2
        - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * ep2) * Math.pow(D, 4) / 24
        + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * ep2 - 3 * C1 * C1) * Math.pow(D, 6) / 720);

    double lambda = Math.toRadians(centralMeridian) + (D
        - (1 + 2 * T1 + C1) * Math.pow(D, 3) / 6
        + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * ep2 + 24 * T1 * T1) * Math.pow(D, 5) / 120) / cosPhi1;

    return new Wgs84Result(Math.toDegrees(phi), Math.toDegrees(lambda));
  }
}
