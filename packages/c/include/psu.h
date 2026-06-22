#ifndef PSU_H
#define PSU_H

#include <stddef.h>
#include <stdbool.h>

typedef struct {
    const char *code;
    const char *name;
    const char *capital;
    double lat;
    double lng;
} PsuUbigeo;

typedef struct {
    int zone;
    const char *hemisphere;
    int epsg;
    double easting;
    double northing;
} PsuUtm;

typedef struct {
    double lat;
    double lng;
} PsuLatLng;

typedef struct {
    double minX;
    double minY;
    double maxX;
    double maxY;
} PsuBoundingBox;

typedef struct {
    const char *risk;
    int score;
} PsuRisk;

typedef struct {
    const char *entity;
    const char *level;
} PsuIntersection;

const PsuUbigeo *psu_get_department(const char *code);
const PsuUbigeo *psu_get_region(const char *code);
const PsuUbigeo *psu_get_province(const char *code);
const PsuUbigeo *psu_get_district(const char *code);
bool psu_is_valid_ubigeo(const char *code);
size_t psu_search_districts(const char *query, int limit, const PsuUbigeo **out, size_t out_cap);
bool psu_parent_of(const char *code, char *out, size_t out_size);

int psu_utm_zone_for(double lng);
PsuUtm psu_to_utm(double lat, double lng);
PsuLatLng psu_to_wgs84(double easting, double northing, int zone);

double psu_to_hectares(double m2);
double psu_to_km2(double m2);
void psu_format_area(double m2, char *out, size_t out_size);

double psu_distance(const double a[2], const double b[2]);

PsuBoundingBox psu_bounding_box_coords(const double *coords, size_t pair_count);

const char *psu_recommendation_for(const char *entity, char *buf, size_t buf_size);
size_t psu_generate_recommendations(const char **entities, size_t count,
                                    char (*out)[512], size_t out_cap);
const char *psu_classify_hazard(const char *text);
const char *psu_hazard_for_category(const char *category);
int psu_risk_level_to_score(const char *level);
PsuRisk psu_calculate_territorial_risk(const PsuIntersection *intersections, size_t count);
const char *psu_generate_territorial_summary(const PsuIntersection *intersections, size_t count,
                                             char *out, size_t out_size);

#endif
