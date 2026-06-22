#ifndef PSU_DATA_H
#define PSU_DATA_H

#include <stddef.h>
#include <math.h>
#include "psu.h"

typedef struct {
    int zone;
    const char *hemisphere;
    int epsg;
    double centralMeridian;
    double lngMin;
    double lngMax;
} PsuUtmZone;

typedef struct {
    const char *key;
    const char *value;
} PsuKeyValue;

typedef struct {
    const char *type;
    const char **keywords;
    size_t keyword_count;
} PsuHazardRule;

extern const PsuUbigeo psu_departments[];
extern const size_t psu_departments_count;
extern const PsuUbigeo psu_provinces[];
extern const size_t psu_provinces_count;
extern const PsuUbigeo psu_districts[];
extern const size_t psu_districts_count;
extern const char *psu_districts_norm[];

extern const PsuUtmZone psu_utm_zones[];
extern const size_t psu_utm_zones_count;
extern const double psu_utm_a;
extern const double psu_utm_f;
extern const double psu_utm_k0;
extern const double psu_utm_false_easting;
extern const double psu_utm_false_northing_south;

extern const PsuKeyValue psu_recommendations[];
extern const size_t psu_recommendations_count;
extern const char *psu_recommendation_fallback;

extern const PsuHazardRule psu_hazard_rules[];
extern const size_t psu_hazard_rules_count;
extern const PsuKeyValue psu_category_fallback[];
extern const size_t psu_category_fallback_count;
extern const char *psu_hazard_default;

#endif
