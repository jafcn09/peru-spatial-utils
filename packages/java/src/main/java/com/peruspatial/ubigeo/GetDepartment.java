package com.peruspatial.ubigeo;

import com.peruspatial.data.UbigeoData;

public final class GetDepartment {
  private GetDepartment() {}

  public static UbigeoRecord getDepartment(String code) {
    if (code == null) return null;
    for (UbigeoRecord r : UbigeoData.DEPARTMENTS) {
      if (r.code().equals(code)) return r;
    }
    return null;
  }
}
