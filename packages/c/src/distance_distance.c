#include "psu.h"
#include <math.h>

double psu_distance(const double a[2], const double b[2]) {
    const double R = 6371.0088;
    double rad = M_PI / 180.0;
    double lat1 = a[1] * rad;
    double lat2 = b[1] * rad;
    double dLat = (b[1] - a[1]) * rad;
    double dLng = (b[0] - a[0]) * rad;
    double h = sin(dLat / 2.0) * sin(dLat / 2.0)
             + cos(lat1) * cos(lat2) * sin(dLng / 2.0) * sin(dLng / 2.0);
    return 2.0 * R * asin(sqrt(h));
}
