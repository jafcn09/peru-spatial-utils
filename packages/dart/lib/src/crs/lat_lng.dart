class LatLng {
  final double lat;
  final double lng;

  const LatLng({required this.lat, required this.lng});

  Map<String, double> toMap() => {'lat': lat, 'lng': lng};
}
