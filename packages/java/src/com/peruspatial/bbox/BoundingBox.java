package com.peruspatial.bbox;

import java.util.List;
import java.util.Map;

public final class BoundingBox {
  private BoundingBox() {}

  public static BoundingBoxResult boundingBox(Object geojson) {
    double[] acc = {Double.POSITIVE_INFINITY, Double.POSITIVE_INFINITY,
        Double.NEGATIVE_INFINITY, Double.NEGATIVE_INFINITY};
    scan(geojson, acc);
    if (acc[0] == Double.POSITIVE_INFINITY) {
      throw new IllegalArgumentException("no coordinates found in geojson");
    }
    return new BoundingBoxResult(acc[0], acc[1], acc[2], acc[3]);
  }

  @SuppressWarnings("unchecked")
  private static void scan(Object node, double[] acc) {
    if (node == null) return;

    if (node instanceof Map<?, ?> m) {
      Object type = m.get("type");
      if ("FeatureCollection".equals(type)) {
        scan(m.get("features"), acc);
      } else if ("Feature".equals(type)) {
        scan(m.get("geometry"), acc);
      } else if ("GeometryCollection".equals(type)) {
        scan(m.get("geometries"), acc);
      } else {
        scan(m.get("coordinates"), acc);
      }
      return;
    }

    if (node instanceof double[] pos) {
      consume(pos[0], pos[1], acc);
      return;
    }

    if (node instanceof Iterable<?> it) {
      if (isPosition(it)) {
        List<Number> p = toNumberList((Iterable<Object>) it);
        consume(p.get(0).doubleValue(), p.get(1).doubleValue(), acc);
      } else {
        for (Object child : it) scan(child, acc);
      }
      return;
    }

    if (node instanceof Object[] arr) {
      for (Object child : arr) scan(child, acc);
    }
  }

  private static boolean isPosition(Iterable<?> it) {
    boolean any = false;
    for (Object o : it) {
      any = true;
      if (!(o instanceof Number)) return false;
    }
    return any;
  }

  @SuppressWarnings("unchecked")
  private static List<Number> toNumberList(Iterable<Object> it) {
    return (List<Number>) (List<?>) java.util.stream.StreamSupport
        .stream(it.spliterator(), false).toList();
  }

  private static void consume(double lng, double lat, double[] acc) {
    if (lng < acc[0]) acc[0] = lng;
    if (lat < acc[1]) acc[1] = lat;
    if (lng > acc[2]) acc[2] = lng;
    if (lat > acc[3]) acc[3] = lat;
  }
}
