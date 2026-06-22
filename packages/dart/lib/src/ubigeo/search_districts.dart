import 'normalize_text.dart';
import 'ubigeo_record.dart';
import 'ubigeo_store.dart';

List<UbigeoRecord> searchDistricts(String query, {int limit = 10}) {
  final normalizedQuery = normalizeText(query);
  if (normalizedQuery.isEmpty) return [];

  int rank(String name) {
    final n = normalizeText(name);
    if (n == normalizedQuery) return 0;
    if (n.startsWith(normalizedQuery)) return 1;
    if (RegExp(r'\b' + RegExp.escape(normalizedQuery)).hasMatch(n)) return 2;
    if (n.contains(normalizedQuery)) return 3;
    return -1;
  }

  final matches = <MapEntry<int, UbigeoRecord>>[];
  var order = 0;
  for (final record in UbigeoStore.districts.values) {
    final r = rank(record.name);
    if (r >= 0) {
      matches.add(MapEntry(r * 1000000 + order, record));
    }
    order++;
  }

  matches.sort((a, b) => a.key.compareTo(b.key));

  return matches.take(limit).map((e) => e.value).toList();
}
