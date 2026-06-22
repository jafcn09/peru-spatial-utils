import 'intersection.dart';
import 'territorial_risk.dart';

const Map<String, int> _weights = {'BAJO': 10, 'MEDIO': 20, 'ALTO': 34};

TerritorialRisk calculateTerritorialRisk(List<Intersection> intersections) {
  if (intersections.isEmpty) {
    return const TerritorialRisk(risk: 'BAJO', score: 0);
  }

  var sum = 0;
  for (final i in intersections) {
    sum += _weights[i.level] ?? 0;
  }

  final score = sum > 100 ? 100 : sum;

  String risk;
  if (score >= 67) {
    risk = 'ALTO';
  } else if (score >= 34) {
    risk = 'MEDIO';
  } else {
    risk = 'BAJO';
  }

  return TerritorialRisk(risk: risk, score: score);
}
