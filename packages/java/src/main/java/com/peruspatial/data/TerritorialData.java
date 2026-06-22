package com.peruspatial.data;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class TerritorialData {
  private TerritorialData() {}

  public static final Map<String, String> ENTITIES = new LinkedHashMap<>();
  public static final String FALLBACK = "Verificar la normativa aplicable de {entity} antes de cualquier intervencion en el territorio.";

  public record Rule(String type, List<String> keywords) {}

  public static final List<Rule> RULES = List.of(
    new Rule("tsunami", List.of("tsunami")),
    new Rule("earthquake", List.of("sism", "terremoto")),
    new Rule("flood", List.of("inund", "aneg")),
    new Rule("landslide", List.of("desliz", "huayco", "derrumbe")),
    new Rule("volcanic", List.of("volcan")),
    new Rule("fire", List.of("incend")),
    new Rule("drought", List.of("sequ"))
  );

  public static final Map<String, String> CATEGORY_FALLBACK = new LinkedHashMap<>();
  public static final String DEFAULT_HAZARD = "earthquake";

  static {
    ENTITIES.put("SERNANP", "El territorio se superpone con un Area Natural Protegida. Requiere opinion tecnica previa favorable del SERNANP conforme a la Ley N 26834.");
    ENTITIES.put("INGEMMET", "Existe superposicion con derechos mineros. Verificar vigencia y titularidad ante INGEMMET antes de cualquier intervencion.");
    ENTITIES.put("SUNARP", "Se identifican predios titulados inscritos en SUNARP. Revisar la situacion registral y posibles derechos de terceros.");
    ENTITIES.put("MIDAGRI", "El territorio coincide con comunidades campesinas o nativas. Podria requerir proceso de consulta previa y coordinacion con MIDAGRI.");
    ENTITIES.put("SERFOR", "El territorio forma parte del ordenamiento forestal. Verificar restricciones de uso forestal ante SERFOR.");
    ENTITIES.put("IGN", "Se identifican centros poblados o rasgos geograficos del IGN en la zona. Considerar en la planificacion territorial.");
    CATEGORY_FALLBACK.put("AMBIENTAL", "flood");
    CATEGORY_FALLBACK.put("ANTROPICO", "fire");
    CATEGORY_FALLBACK.put("BIOLOGICO", "drought");
    CATEGORY_FALLBACK.put("INSTITUCIONAL", "landslide");
  }
}
