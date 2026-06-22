package com.peruspatial.ubigeo;

public final class ParentOf {
  private ParentOf() {}

  public static String parentOf(String code) {
    if (code == null) return null;
    if (code.length() == 6) return code.substring(0, 4);
    if (code.length() == 4) return code.substring(0, 2);
    return null;
  }
}
