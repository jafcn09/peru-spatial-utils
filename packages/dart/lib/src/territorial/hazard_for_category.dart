import 'territorial_data.dart';

String hazardForCategory(String category) {
  final mapped = TerritorialData.categoryFallback[category];
  if (mapped != null) return mapped as String;
  return TerritorialData.defaultHazard;
}
