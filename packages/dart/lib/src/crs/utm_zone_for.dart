import 'utm_config.dart';

int utmZoneFor(double lng) {
  for (final z in UtmConfig.zones) {
    if (lng >= z.lngMin && lng < z.lngMax) return z.zone;
  }
  return ((lng + 180) / 6).floor() + 1;
}
