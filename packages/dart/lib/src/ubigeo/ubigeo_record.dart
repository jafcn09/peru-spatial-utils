class UbigeoRecord {
  final String code;
  final String name;
  final String capital;
  final double? lat;
  final double? lng;

  const UbigeoRecord({
    required this.code,
    required this.name,
    required this.capital,
    required this.lat,
    required this.lng,
  });

  factory UbigeoRecord.fromJson(Map<String, dynamic> json) {
    return UbigeoRecord(
      code: json['code'] as String,
      name: json['name'] as String,
      capital: json['capital'] as String,
      lat: (json['lat'] as num?)?.toDouble(),
      lng: (json['lng'] as num?)?.toDouble(),
    );
  }
}
