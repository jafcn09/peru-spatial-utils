import 'dart:io';

import 'package:peru_spatial_utils/peru_spatial_utils.dart';

int _failures = 0;

void check(String label, bool condition) {
  if (condition) {
    print('PASS  $label');
  } else {
    print('FAIL  $label');
    _failures++;
  }
}

void checkEq(String label, Object? actual, Object? expected) {
  final ok = actual == expected;
  if (ok) {
    print('PASS  $label');
  } else {
    print('FAIL  $label  (expected: $expected, actual: $actual)');
    _failures++;
  }
}

void checkClose(String label, double actual, double expected, double tol) {
  final ok = (actual - expected).abs() <= tol;
  if (ok) {
    print('PASS  $label');
  } else {
    print('FAIL  $label  (expected: $expected, actual: $actual, tol: $tol)');
    _failures++;
  }
}

void main() {
  checkEq('getRegion("24").name', getRegion('24')?.name, 'Tumbes');
  checkEq('getDepartment("24").name', getDepartment('24')?.name, 'Tumbes');
  checkEq('getProvince("2402").name', getProvince('2402')?.name,
      'Contralmirante Villar');
  checkEq('getDistrict("240203").name', getDistrict('240203')?.name,
      'Canoas de Punta Sal');

  checkEq('isValidUbigeo("24")', isValidUbigeo('24'), true);
  checkEq('isValidUbigeo("2402")', isValidUbigeo('2402'), true);
  checkEq('isValidUbigeo("240203")', isValidUbigeo('240203'), true);
  checkEq('isValidUbigeo("999999")', isValidUbigeo('999999'), false);
  checkEq('isValidUbigeo("ab")', isValidUbigeo('ab'), false);
  checkEq('isValidUbigeo("24x")', isValidUbigeo('24x'), false);

  checkEq('parentOf("240203")', parentOf('240203'), '2402');
  checkEq('parentOf("2402")', parentOf('2402'), '24');
  checkEq('parentOf("24")', parentOf('24'), null);

  final searchTumbes = searchDistricts('tumbes');
  check('searchDistricts("tumbes") returns results', searchTumbes.isNotEmpty);
  check('searchDistricts respects limit',
      searchDistricts('san', limit: 3).length <= 3);

  checkEq('utmZoneFor(-80.451)', utmZoneFor(-80.451), 17);
  checkEq('utmZoneFor(-77.0428)', utmZoneFor(-77.0428), 18);
  checkEq('utmZoneFor(-71.9675)', utmZoneFor(-71.9675), 19);

  final u1 = toUTM(-3.683, -80.451);
  checkEq('toUTM(...).zone', u1.zone, 17);
  checkEq('toUTM(...).hemisphere', u1.hemisphere, 'S');
  checkEq('toUTM(...).epsg', u1.epsg, 32717);
  checkEq('toUTM(...).easting', u1.easting, 560966);
  checkEq('toUTM(...).northing', u1.northing, 9592893);

  final u2 = toUTM(-12.0464, -77.0428);
  checkEq('toUTM(Lima).zone', u2.zone, 18);
  checkEq('toUTM(Lima).epsg', u2.epsg, 32718);
  checkEq('toUTM(Lima).easting', u2.easting, 277617);
  checkEq('toUTM(Lima).northing', u2.northing, 8667488);

  final u3 = toUTM(-13.5320, -71.9675);
  checkEq('toUTM(Cusco).zone', u3.zone, 19);
  checkEq('toUTM(Cusco).epsg', u3.epsg, 32719);
  checkEq('toUTM(Cusco).easting', u3.easting, 178771);
  checkEq('toUTM(Cusco).northing', u3.northing, 8502083);

  final w = toWGS84(560966, 9592893, 17);
  checkClose('toWGS84 lat', w.lat, -3.68300, 1e-4);
  checkClose('toWGS84 lng', w.lng, -80.45100, 1e-4);

  checkClose('toHectares(467443.66)', toHectares(467443.66), 46.744366, 1e-9);
  checkClose('toKm2(467443.66)', toKm2(467443.66), 0.46744366, 1e-12);
  checkEq('formatArea(467443.66)', formatArea(467443.66),
      '467,443.66 m² (46.74 ha)');

  checkClose(
      'distance',
      distance([-80.451, -3.683], [-80.320, -3.561]),
      19.8839,
      1e-3);

  final bb = boundingBox({
    'type': 'Polygon',
    'coordinates': [
      [
        [-80.56, -3.82],
        [-80.11, -3.82],
        [-80.11, -3.42],
        [-80.56, -3.42],
        [-80.56, -3.82]
      ]
    ]
  });
  checkClose('bbox.minX', bb.minX, -80.56, 1e-12);
  checkClose('bbox.minY', bb.minY, -3.82, 1e-12);
  checkClose('bbox.maxX', bb.maxX, -80.11, 1e-12);
  checkClose('bbox.maxY', bb.maxY, -3.42, 1e-12);

  check('recommendationFor("SERNANP")',
      recommendationFor('SERNANP').startsWith('El territorio se superpone con un Area'));
  checkEq(
      'recommendationFor("XYZ")',
      recommendationFor('XYZ'),
      'Verificar la normativa aplicable de XYZ antes de cualquier intervencion en el territorio.');

  checkEq('classifyHazard flood',
      classifyHazard('Zona de inundacion recurrente'), 'flood');
  checkEq('classifyHazard tsunami', classifyHazard('Alerta de tsunami'),
      'tsunami');
  checkEq('classifyHazard default', classifyHazard('evento desconocido'),
      'earthquake');

  checkEq('hazardForCategory AMBIENTAL', hazardForCategory('AMBIENTAL'),
      'flood');
  checkEq('hazardForCategory unknown', hazardForCategory('NADA'), 'earthquake');

  checkEq('riskLevelToScore BAJO', riskLevelToScore('BAJO'), 1);
  checkEq('riskLevelToScore MEDIO', riskLevelToScore('MEDIO'), 2);
  checkEq('riskLevelToScore ALTO', riskLevelToScore('ALTO'), 3);
  checkEq('riskLevelToScore unknown', riskLevelToScore('NADA'), 0);

  final r1 = calculateTerritorialRisk([
    const Intersection(entity: '', level: 'ALTO'),
    const Intersection(entity: '', level: 'MEDIO'),
  ]);
  checkEq('risk1.score', r1.score, 54);
  checkEq('risk1.risk', r1.risk, 'MEDIO');

  final r2 = calculateTerritorialRisk([
    const Intersection(entity: '', level: 'ALTO'),
    const Intersection(entity: '', level: 'ALTO'),
  ]);
  checkEq('risk2.score', r2.score, 68);
  checkEq('risk2.risk', r2.risk, 'ALTO');

  final r3 = calculateTerritorialRisk([]);
  checkEq('risk3.score', r3.score, 0);
  checkEq('risk3.risk', r3.risk, 'BAJO');

  checkEq('generateTerritorialSummary empty',
      generateTerritorialSummary([]),
      'El territorio no presenta superposiciones con las capas evaluadas.');
  checkEq(
      'generateTerritorialSummary populated',
      generateTerritorialSummary([
        const Intersection(entity: 'SERNANP', level: 'ALTO'),
        const Intersection(entity: 'INGEMMET', level: 'MEDIO'),
      ]),
      'El territorio presenta superposicion de nivel ALTO con 2 entidad(es): SERNANP, INGEMMET.');

  checkEq(
      'generateRecommendations dedupes',
      generateRecommendations(['SERNANP', 'SERNANP', 'XYZ']).length,
      2);

  if (_failures > 0) {
    print('\n$_failures test(s) FAILED');
    exit(1);
  }
  print('\nAll tests passed');
  exit(0);
}
