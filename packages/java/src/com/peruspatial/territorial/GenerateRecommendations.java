package com.peruspatial.territorial;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public final class GenerateRecommendations {
  private GenerateRecommendations() {}

  public static List<String> generateRecommendations(List<String> entities) {
    List<String> out = new ArrayList<>();
    if (entities == null) return out;
    Set<String> seen = new LinkedHashSet<>();
    for (String entity : entities) {
      if (seen.add(entity)) {
        out.add(RecommendationFor.recommendationFor(entity));
      }
    }
    return out;
  }
}
