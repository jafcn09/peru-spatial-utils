package com.peruspatial.territorial;

import com.peruspatial.data.TerritorialData;

public final class ClassifyHazard {
  private ClassifyHazard() {}

  public static String classifyHazard(String text) {
    if (text == null) return TerritorialData.DEFAULT_HAZARD;
    String lower = text.toLowerCase();
    for (TerritorialData.Rule rule : TerritorialData.RULES) {
      for (String keyword : rule.keywords()) {
        if (lower.contains(keyword)) return rule.type();
      }
    }
    return TerritorialData.DEFAULT_HAZARD;
  }
}
