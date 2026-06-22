import 'territorial_data.dart';

String classifyHazard(String text) {
  final lower = text.toLowerCase();
  for (final rule in TerritorialData.hazardRules) {
    final keywords = rule['keywords'] as List<dynamic>;
    for (final keyword in keywords) {
      if (lower.contains(keyword as String)) {
        return rule['type'] as String;
      }
    }
  }
  return TerritorialData.defaultHazard;
}
