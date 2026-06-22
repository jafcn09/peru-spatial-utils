package com.peruspatial.area;

public final class ToHectares {
  private ToHectares() {}

  public static double toHectares(double m2) {
    return m2 / 10000.0;
  }
}
