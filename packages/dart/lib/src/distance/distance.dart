import 'dart:math' as math;

const double _earthRadiusKm = 6371.0088;

double distance(List<double> a, List<double> b) {
  final lng1 = a[0];
  final lat1 = a[1];
  final lng2 = b[0];
  final lat2 = b[1];

  final dLat = (lat2 - lat1) * math.pi / 180;
  final dLng = (lng2 - lng1) * math.pi / 180;

  final phi1 = lat1 * math.pi / 180;
  final phi2 = lat2 * math.pi / 180;

  final h = math.sin(dLat / 2) * math.sin(dLat / 2) +
      math.cos(phi1) * math.cos(phi2) * math.sin(dLng / 2) * math.sin(dLng / 2);

  return 2 * _earthRadiusKm * math.asin(math.sqrt(h));
}
