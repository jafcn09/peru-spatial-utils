import 'dart:convert';

import '../data/ubigeo_departments_data.dart';
import '../data/ubigeo_districts_data.dart';
import '../data/ubigeo_provinces_data.dart';
import 'ubigeo_record.dart';

class UbigeoStore {
  static final Map<String, UbigeoRecord> departments =
      _index(ubigeoDepartmentsJson);
  static final Map<String, UbigeoRecord> provinces =
      _index(ubigeoProvincesJson);
  static final Map<String, UbigeoRecord> districts =
      _index(ubigeoDistrictsJson);

  static Map<String, UbigeoRecord> _index(String json) {
    final list = jsonDecode(json) as List<dynamic>;
    final map = <String, UbigeoRecord>{};
    for (final item in list) {
      final record = UbigeoRecord.fromJson(item as Map<String, dynamic>);
      map[record.code] = record;
    }
    return map;
  }
}
