package com.peruspatial.distance;

public final class Distance {
  private Distance() {}

  private static final double R = 6371.0088;

  public static double distance(double[] a, double[] b) {
    double lat1 = Math.toRadians(a[1]);
    double lat2 = Math.toRadians(b[1]);
    double dLat = Math.toRadians(b[1] - a[1]);
    double dLng = Math.toRadians(b[0] - a[0]);

    double h = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    double c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    return R * c;
  }
}
