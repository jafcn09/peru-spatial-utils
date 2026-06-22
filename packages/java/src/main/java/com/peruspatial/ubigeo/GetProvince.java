package com.peruspatial.ubigeo;

import com.peruspatial.data.UbigeoData;

public final class GetProvince {
  private GetProvince() {}

  public static UbigeoRecord getProvince(String code) {
    if (code == null) return null;
    for (UbigeoRecord r : UbigeoData.PROVINCES) {
      if (r.code().equals(code)) return r;
    }
    return null;
  }
}
