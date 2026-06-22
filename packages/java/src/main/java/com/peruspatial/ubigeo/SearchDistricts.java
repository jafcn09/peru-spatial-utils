package com.peruspatial.ubigeo;

import com.peruspatial.data.UbigeoData;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;

public final class SearchDistricts {
  private SearchDistricts() {}

  public static List<UbigeoRecord> searchDistricts(String query) {
    return searchDistricts(query, 10);
  }

  public static List<UbigeoRecord> searchDistricts(String query, int limit) {
    List<UbigeoRecord> result = new ArrayList<>();
    if (query == null) return result;
    String q = normalize(query);
    if (q.isEmpty()) return result;

    List<UbigeoRecord> exact = new ArrayList<>();
    List<UbigeoRecord> starts = new ArrayList<>();
    List<UbigeoRecord> wordStart = new ArrayList<>();
    List<UbigeoRecord> contains = new ArrayList<>();

    for (UbigeoRecord r : UbigeoData.DISTRICTS) {
      String n = normalize(r.name());
      if (n.equals(q)) {
        exact.add(r);
      } else if (n.startsWith(q)) {
        starts.add(r);
      } else if (isWordStart(n, q)) {
        wordStart.add(r);
      } else if (n.contains(q)) {
        contains.add(r);
      }
    }

    addUntil(result, exact, limit);
    addUntil(result, starts, limit);
    addUntil(result, wordStart, limit);
    addUntil(result, contains, limit);
    return result;
  }

  private static void addUntil(List<UbigeoRecord> out, List<UbigeoRecord> src, int limit) {
    for (UbigeoRecord r : src) {
      if (out.size() >= limit) return;
      out.add(r);
    }
  }

  private static boolean isWordStart(String name, String q) {
    int idx = 0;
    while ((idx = name.indexOf(q, idx)) != -1) {
      if (idx > 0 && name.charAt(idx - 1) == ' ') return true;
      idx += 1;
    }
    return false;
  }

  static String normalize(String s) {
    String n = Normalizer.normalize(s.trim().toLowerCase(), Normalizer.Form.NFD);
    return n.replaceAll("\\p{M}+", "");
  }
}
