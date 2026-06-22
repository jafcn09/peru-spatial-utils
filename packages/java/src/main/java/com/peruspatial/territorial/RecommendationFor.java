package com.peruspatial.territorial;

import com.peruspatial.data.TerritorialData;

public final class RecommendationFor {
  private RecommendationFor() {}

  public static String recommendationFor(String entity) {
    String found = TerritorialData.ENTITIES.get(entity);
    if (found != null) return found;
    return TerritorialData.FALLBACK.replace("{entity}", entity == null ? "" : entity);
  }
}
