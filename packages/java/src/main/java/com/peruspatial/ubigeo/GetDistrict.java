package com.peruspatial.ubigeo;

import com.peruspatial.data.UbigeoData;

public final class GetDistrict {
  private GetDistrict() {}

  public static UbigeoRecord getDistrict(String code) {
    if (code == null) return null;
    for (UbigeoRecord r : UbigeoData.DISTRICTS) {
      if (r.code().equals(code)) return r;
    }
    return null;
  }
}
