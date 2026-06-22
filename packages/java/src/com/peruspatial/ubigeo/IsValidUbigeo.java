package com.peruspatial.ubigeo;

public final class IsValidUbigeo {
  private IsValidUbigeo() {}

  public static boolean isValidUbigeo(String code) {
    if (code == null) return false;
    if (!code.chars().allMatch(Character::isDigit) || code.isEmpty()) return false;
    return switch (code.length()) {
      case 2 -> GetDepartment.getDepartment(code) != null;
      case 4 -> GetProvince.getProvince(code) != null;
      case 6 -> GetDistrict.getDistrict(code) != null;
      default -> false;
    };
  }
}
