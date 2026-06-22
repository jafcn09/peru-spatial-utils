import 'territorial_data.dart';

String recommendationFor(String entity) {
  final known = TerritorialData.entities[entity];
  if (known != null) return known as String;
  return TerritorialData.fallback.replaceAll('{entity}', entity);
}
