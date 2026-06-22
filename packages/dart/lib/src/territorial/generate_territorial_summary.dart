import 'intersection.dart';

const List<String> _order = ['ALTO', 'MEDIO', 'BAJO'];

String generateTerritorialSummary(List<Intersection> intersections) {
  if (intersections.isEmpty) {
    return 'El territorio no presenta superposiciones con las capas evaluadas.';
  }

  String dominant = 'BAJO';
  for (final level in _order) {
    if (intersections.any((i) => i.level == level)) {
      dominant = level;
      break;
    }
  }

  final entities = intersections.map((i) => i.entity).join(', ');
  final n = intersections.length;

  return 'El territorio presenta superposicion de nivel $dominant con $n '
      'entidad(es): $entities.';
}
