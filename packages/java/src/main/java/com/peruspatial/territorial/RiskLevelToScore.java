package com.peruspatial.territorial;

public final class RiskLevelToScore {
  private RiskLevelToScore() {}

  public static int riskLevelToScore(String level) {
    if (level == null) return 0;
    return switch (level) {
      case "BAJO" -> 1;
      case "MEDIO" -> 2;
      case "ALTO" -> 3;
      default -> 0;
    };
  }
}
