#include "psu.h"
#include "psu_data.h"
#include <math.h>

int psu_utm_zone_for(double lng) {
    for (size_t i = 0; i < psu_utm_zones_count; i++) {
        if (lng >= psu_utm_zones[i].lngMin && lng < psu_utm_zones[i].lngMax) {
            return psu_utm_zones[i].zone;
        }
    }
    return (int)floor((lng + 180.0) / 6.0) + 1;
}
