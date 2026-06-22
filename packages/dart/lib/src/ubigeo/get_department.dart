import 'ubigeo_record.dart';
import 'ubigeo_store.dart';

UbigeoRecord? getDepartment(String code) => UbigeoStore.departments[code];

UbigeoRecord? getRegion(String code) => getDepartment(code);
