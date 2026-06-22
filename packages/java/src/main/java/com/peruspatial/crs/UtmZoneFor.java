package com.peruspatial.crs;

import com.peruspatial.data.CrsData;

public final class UtmZoneFor {
  private UtmZoneFor() {}

  public static int utmZoneFor(double lng) {
    for (CrsData.Zone z : CrsData.ZONES) {
      if (lng >= z.lngMin() && lng < z.lngMax()) return z.zone();
    }
    return (int) Math.floor((lng + 180) / 6) + 1;
  }
}
