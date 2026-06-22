package com.peruspatial.ubigeo;

public final class GetRegion {
  private GetRegion() {}

  public static UbigeoRecord getRegion(String code) {
    return GetDepartment.getDepartment(code);
  }
}
