package com.peruspatial.area;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

public final class FormatArea {
  private FormatArea() {}

  public static String formatArea(double m2) {
    DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.US);
    DecimalFormat df = new DecimalFormat("#,##0.00", symbols);
    String m2Str = df.format(m2);
    String haStr = df.format(ToHectares.toHectares(m2));
    return m2Str + " m² (" + haStr + " ha)";
  }
}
