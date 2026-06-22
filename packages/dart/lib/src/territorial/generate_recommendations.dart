import 'recommendation_for.dart';

List<String> generateRecommendations(List<String> entities) {
  final seen = <String>{};
  final result = <String>[];
  for (final entity in entities) {
    if (seen.add(entity)) {
      result.add(recommendationFor(entity));
    }
  }
  return result;
}
