#include "psu.h"
#include "psu_data.h"
#include <math.h>

static double central_meridian(int zone) {
    for (size_t i = 0; i < psu_utm_zones_count; i++) {
        if (psu_utm_zones[i].zone == zone) return psu_utm_zones[i].centralMeridian;
    }
    return (double)((zone - 1) * 6 - 180 + 3);
}

PsuLatLng psu_to_wgs84(double easting, double northing, int zone) {
    double a = psu_utm_a;
    double f = psu_utm_f;
    double k0 = psu_utm_k0;
    double e2 = f * (2.0 - f);
    double ep2 = e2 / (1.0 - e2);

    double x = easting - psu_utm_false_easting;
    double y = northing - psu_utm_false_northing_south;

    double M = y / k0;
    double mu = M / (a * (1.0 - e2 / 4.0 - 3.0 * e2 * e2 / 64.0 - 5.0 * e2 * e2 * e2 / 256.0));

    double e1 = (1.0 - sqrt(1.0 - e2)) / (1.0 + sqrt(1.0 - e2));

    double phi1 = mu
        + (3.0 * e1 / 2.0 - 27.0 * e1 * e1 * e1 / 32.0) * sin(2.0 * mu)
        + (21.0 * e1 * e1 / 16.0 - 55.0 * e1 * e1 * e1 * e1 / 32.0) * sin(4.0 * mu)
        + (151.0 * e1 * e1 * e1 / 96.0) * sin(6.0 * mu)
        + (1097.0 * e1 * e1 * e1 * e1 / 512.0) * sin(8.0 * mu);

    double sinp = sin(phi1);
    double cosp = cos(phi1);
    double tanp = tan(phi1);

    double N1 = a / sqrt(1.0 - e2 * sinp * sinp);
    double T1 = tanp * tanp;
    double C1 = ep2 * cosp * cosp;
    double R1 = a * (1.0 - e2) / pow(1.0 - e2 * sinp * sinp, 1.5);
    double D = x / (N1 * k0);

    double D2 = D * D;
    double phi = phi1 - (N1 * tanp / R1) * (D2 / 2.0
        - (5.0 + 3.0 * T1 + 10.0 * C1 - 4.0 * C1 * C1 - 9.0 * ep2) * D2 * D2 / 24.0
        + (61.0 + 90.0 * T1 + 298.0 * C1 + 45.0 * T1 * T1 - 252.0 * ep2 - 3.0 * C1 * C1) * D2 * D2 * D2 / 720.0);

    double lam = (D - (1.0 + 2.0 * T1 + C1) * D2 * D / 6.0
        + (5.0 - 2.0 * C1 + 28.0 * T1 - 3.0 * C1 * C1 + 8.0 * ep2 + 24.0 * T1 * T1) * D2 * D2 * D / 120.0) / cosp;

    double deg = 180.0 / M_PI;
    PsuLatLng result;
    result.lat = phi * deg;
    result.lng = central_meridian(zone) + lam * deg;
    return result;
}
