String? parentOf(String code) {
  if (code.length == 6) return code.substring(0, 4);
  if (code.length == 4) return code.substring(0, 2);
  return null;
}
