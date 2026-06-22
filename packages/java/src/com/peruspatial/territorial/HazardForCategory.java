package com.peruspatial.territorial;

import com.peruspatial.data.TerritorialData;

public final class HazardForCategory {
  private HazardForCategory() {}

  public static String hazardForCategory(String category) {
    String found = TerritorialData.CATEGORY_FALLBACK.get(category);
    if (found != null) return found;
    return TerritorialData.DEFAULT_HAZARD;
  }
}
