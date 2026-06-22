package com.peruspatial.territorial;

import java.util.List;

public final class CalculateTerritorialRisk {
  private CalculateTerritorialRisk() {}

  public static RiskResult calculateTerritorialRisk(List<Intersection> intersections) {
    if (intersections == null || intersections.isEmpty()) {
      return new RiskResult("BAJO", 0);
    }
    int sum = 0;
    for (Intersection i : intersections) {
      sum += weight(i.level());
    }
    int score = Math.min(100, sum);
    String risk = score >= 67 ? "ALTO" : score >= 34 ? "MEDIO" : "BAJO";
    return new RiskResult(risk, score);
  }

  private static int weight(String level) {
    if (level == null) return 0;
    return switch (level) {
      case "BAJO" -> 10;
      case "MEDIO" -> 20;
      case "ALTO" -> 34;
      default -> 0;
    };
  }
}
