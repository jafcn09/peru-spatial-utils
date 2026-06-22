#include "psu.h"
#include "psu_data.h"
#include <math.h>

static double central_meridian(int zone) {
    for (size_t i = 0; i < psu_utm_zones_count; i++) {
        if (psu_utm_zones[i].zone == zone) return psu_utm_zones[i].centralMeridian;
    }
    return (double)((zone - 1) * 6 - 180 + 3);
}

PsuUtm psu_to_utm(double lat, double lng) {
    int zone = psu_utm_zone_for(lng);
    double lon0 = central_meridian(zone);

    double a = psu_utm_a;
    double f = psu_utm_f;
    double k0 = psu_utm_k0;
    double e2 = f * (2.0 - f);
    double ep2 = e2 / (1.0 - e2);

    double rad = M_PI / 180.0;
    double phi = lat * rad;
    double lam = lng * rad;
    double lam0 = lon0 * rad;

    double N = a / sqrt(1.0 - e2 * sin(phi) * sin(phi));
    double T = tan(phi) * tan(phi);
    double C = ep2 * cos(phi) * cos(phi);
    double A = cos(phi) * (lam - lam0);

    double M = a * ((1.0 - e2 / 4.0 - 3.0 * e2 * e2 / 64.0 - 5.0 * e2 * e2 * e2 / 256.0) * phi
                    - (3.0 * e2 / 8.0 + 3.0 * e2 * e2 / 32.0 + 45.0 * e2 * e2 * e2 / 1024.0) * sin(2.0 * phi)
                    + (15.0 * e2 * e2 / 256.0 + 45.0 * e2 * e2 * e2 / 1024.0) * sin(4.0 * phi)
                    - (35.0 * e2 * e2 * e2 / 3072.0) * sin(6.0 * phi));

    double A2 = A * A;
    double easting = k0 * N * (A + (1.0 - T + C) * A2 * A / 6.0
                    + (5.0 - 18.0 * T + T * T + 72.0 * C - 58.0 * ep2) * A2 * A2 * A / 120.0)
                    + psu_utm_false_easting;

    double northing = k0 * (M + N * tan(phi) * (A2 / 2.0
                    + (5.0 - T + 9.0 * C + 4.0 * C * C) * A2 * A2 / 24.0
                    + (61.0 - 58.0 * T + T * T + 600.0 * C - 330.0 * ep2) * A2 * A2 * A2 / 720.0));

    northing += psu_utm_false_northing_south;

    PsuUtm result;
    result.zone = zone;
    result.hemisphere = "S";
    result.epsg = 32700 + zone;
    result.easting = round(easting);
    result.northing = round(northing);
    return result;
}
