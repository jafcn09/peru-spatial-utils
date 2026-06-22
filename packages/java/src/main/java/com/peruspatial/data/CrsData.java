package com.peruspatial.data;

import java.util.List;

public final class CrsData {
  private CrsData() {}

  public static final double A = 6378137.0;
  public static final double F = 0.0033528106647474805;
  public static final double K0 = 0.9996;
  public static final double FALSE_EASTING = 500000.0;
  public static final double FALSE_NORTHING_SOUTH = 10000000.0;

  public record Zone(int zone, String hemisphere, int epsg, double centralMeridian, double lngMin, double lngMax) {}

  public static final List<Zone> ZONES = List.of(
    new Zone(17, "S", 32717, -81.0, -84.0, -78.0),
    new Zone(18, "S", 32718, -75.0, -78.0, -72.0),
    new Zone(19, "S", 32719, -69.0, -72.0, -66.0)
  );
}
