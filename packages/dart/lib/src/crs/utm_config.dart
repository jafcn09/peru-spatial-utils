import 'dart:convert';

import '../data/utm_zones_data.dart';

class UtmZone {
  final int zone;
  final String hemisphere;
  final int epsg;
  final double centralMeridian;
  final double lngMin;
  final double lngMax;

  const UtmZone({
    required this.zone,
    required this.hemisphere,
    required this.epsg,
    required this.centralMeridian,
    required this.lngMin,
    required this.lngMax,
  });
}

class UtmConfig {
  static final Map<String, dynamic> _root =
      jsonDecode(utmZonesJson) as Map<String, dynamic>;

  static final Map<String, dynamic> _ellipsoid =
      _root['ellipsoid'] as Map<String, dynamic>;

  static final double a = (_ellipsoid['a'] as num).toDouble();
  static final double f = (_ellipsoid['f'] as num).toDouble();
  static final double k0 = (_ellipsoid['k0'] as num).toDouble();
  static final double falseEasting =
      (_ellipsoid['falseEasting'] as num).toDouble();
  static final double falseNorthingSouth =
      (_ellipsoid['falseNorthingSouth'] as num).toDouble();

  static final List<UtmZone> zones = (_root['zones'] as List<dynamic>)
      .map((z) => UtmZone(
            zone: z['zone'] as int,
            hemisphere: z['hemisphere'] as String,
            epsg: z['epsg'] as int,
            centralMeridian: (z['centralMeridian'] as num).toDouble(),
            lngMin: (z['lngMin'] as num).toDouble(),
            lngMax: (z['lngMax'] as num).toDouble(),
          ))
      .toList();

  static UtmZone zoneFor(int zone) =>
      zones.firstWhere((z) => z.zone == zone, orElse: () {
        final cm = (zone - 1) * 6 - 180 + 3;
        return UtmZone(
          zone: zone,
          hemisphere: 'S',
          epsg: 32700 + zone,
          centralMeridian: cm.toDouble(),
          lngMin: ((zone - 1) * 6 - 180).toDouble(),
          lngMax: (zone * 6 - 180).toDouble(),
        );
      });
}
