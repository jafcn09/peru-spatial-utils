package com.peruspatial.territorial;

import java.util.List;
import java.util.stream.Collectors;

public final class GenerateTerritorialSummary {
  private GenerateTerritorialSummary() {}

  public static String generateTerritorialSummary(List<Intersection> intersections) {
    if (intersections == null || intersections.isEmpty()) {
      return "El territorio no presenta superposiciones con las capas evaluadas.";
    }
    String dominant = "BAJO";
    for (Intersection i : intersections) {
      if (rank(i.level()) > rank(dominant)) dominant = i.level();
    }
    String entities = intersections.stream()
        .map(Intersection::entity)
        .collect(Collectors.joining(", "));
    return "El territorio presenta superposicion de nivel " + dominant + " con "
        + intersections.size() + " entidad(es): " + entities + ".";
  }

  private static int rank(String level) {
    if (level == null) return 0;
    return switch (level) {
      case "BAJO" -> 1;
      case "MEDIO" -> 2;
      case "ALTO" -> 3;
      default -> 0;
    };
  }
}
