import 'ubigeo_store.dart';

bool isValidUbigeo(String code) {
  final digitsOnly = RegExp(r'^\d+$');
  if (!digitsOnly.hasMatch(code)) return false;
  switch (code.length) {
    case 2:
      return UbigeoStore.departments.containsKey(code);
    case 4:
      return UbigeoStore.provinces.containsKey(code);
    case 6:
      return UbigeoStore.districts.containsKey(code);
    default:
      return false;
  }
}
