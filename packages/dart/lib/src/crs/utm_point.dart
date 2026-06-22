class UtmPoint {
  final int zone;
  final String hemisphere;
  final int epsg;
  final int easting;
  final int northing;

  const UtmPoint({
    required this.zone,
    required this.hemisphere,
    required this.epsg,
    required this.easting,
    required this.northing,
  });

  Map<String, dynamic> toMap() => {
        'zone': zone,
        'hemisphere': hemisphere,
        'epsg': epsg,
        'easting': easting,
        'northing': northing,
      };
}
