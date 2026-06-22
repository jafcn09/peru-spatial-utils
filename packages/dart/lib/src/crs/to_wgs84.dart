import 'dart:math' as math;

import 'lat_lng.dart';
import 'utm_config.dart';

LatLng toWGS84(double easting, double northing, int zone) {
  final zoneConfig = UtmConfig.zoneFor(zone);

  final a = UtmConfig.a;
  final f = UtmConfig.f;
  final k0 = UtmConfig.k0;
  final e2 = f * (2 - f);
  final ep2 = e2 / (1 - e2);

  final x = easting - UtmConfig.falseEasting;
  final y = northing - UtmConfig.falseNorthingSouth;

  final m = y / k0;
  final mu = m /
      (a * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256));

  final e1 = (1 - math.sqrt(1 - e2)) / (1 + math.sqrt(1 - e2));

  final phi1 = mu +
      (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * math.sin(2 * mu) +
      (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * math.sin(4 * mu) +
      (151 * e1 * e1 * e1 / 96) * math.sin(6 * mu) +
      (1097 * e1 * e1 * e1 * e1 / 512) * math.sin(8 * mu);

  final sinPhi1 = math.sin(phi1);
  final cosPhi1 = math.cos(phi1);
  final tanPhi1 = math.tan(phi1);

  final n1 = a / math.sqrt(1 - e2 * sinPhi1 * sinPhi1);
  final t1 = tanPhi1 * tanPhi1;
  final c1 = ep2 * cosPhi1 * cosPhi1;
  final r1 = a * (1 - e2) / math.pow(1 - e2 * sinPhi1 * sinPhi1, 1.5);
  final d = x / (n1 * k0);

  final phi = phi1 -
      (n1 * tanPhi1 / r1) *
          (d * d / 2 -
              (5 + 3 * t1 + 10 * c1 - 4 * c1 * c1 - 9 * ep2) *
                  math.pow(d, 4) /
                  24 +
              (61 + 90 * t1 + 298 * c1 + 45 * t1 * t1 - 252 * ep2 - 3 * c1 * c1) *
                  math.pow(d, 6) /
                  720);

  final lambda = (d -
          (1 + 2 * t1 + c1) * math.pow(d, 3) / 6 +
          (5 - 2 * c1 + 28 * t1 - 3 * c1 * c1 + 8 * ep2 + 24 * t1 * t1) *
              math.pow(d, 5) /
              120) /
      cosPhi1;

  final lat = phi * 180 / math.pi;
  final lng = zoneConfig.centralMeridian + lambda * 180 / math.pi;

  return LatLng(lat: lat, lng: lng);
}
