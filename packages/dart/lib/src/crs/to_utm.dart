import 'dart:math' as math;

import 'utm_config.dart';
import 'utm_point.dart';
import 'utm_zone_for.dart';

UtmPoint toUTM(double lat, double lng) {
  final zoneNumber = utmZoneFor(lng);
  final zone = UtmConfig.zoneFor(zoneNumber);

  final a = UtmConfig.a;
  final f = UtmConfig.f;
  final k0 = UtmConfig.k0;
  final e2 = f * (2 - f);
  final ep2 = e2 / (1 - e2);

  final phi = lat * math.pi / 180;
  final lambda = lng * math.pi / 180;
  final lambda0 = zone.centralMeridian * math.pi / 180;

  final sinPhi = math.sin(phi);
  final cosPhi = math.cos(phi);
  final tanPhi = math.tan(phi);

  final n = a / math.sqrt(1 - e2 * sinPhi * sinPhi);
  final t = tanPhi * tanPhi;
  final c = ep2 * cosPhi * cosPhi;
  final aTerm = cosPhi * (lambda - lambda0);

  final m = a *
      ((1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * phi -
          (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) *
              math.sin(2 * phi) +
          (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * math.sin(4 * phi) -
          (35 * e2 * e2 * e2 / 3072) * math.sin(6 * phi));

  final easting = k0 *
          n *
          (aTerm +
              (1 - t + c) * math.pow(aTerm, 3) / 6 +
              (5 - 18 * t + t * t + 72 * c - 58 * ep2) *
                  math.pow(aTerm, 5) /
                  120) +
      UtmConfig.falseEasting;

  var northing = k0 *
      (m +
          n *
              tanPhi *
              (aTerm * aTerm / 2 +
                  (5 - t + 9 * c + 4 * c * c) * math.pow(aTerm, 4) / 24 +
                  (61 - 58 * t + t * t + 600 * c - 330 * ep2) *
                      math.pow(aTerm, 6) /
                      720));

  if (lat < 0) {
    northing += UtmConfig.falseNorthingSouth;
  }

  return UtmPoint(
    zone: zone.zone,
    hemisphere: 'S',
    epsg: zone.epsg,
    easting: easting.round(),
    northing: northing.round(),
  );
}
