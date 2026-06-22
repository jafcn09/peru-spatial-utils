#include "psu.h"
#include <string.h>

static int level_weight(const char *level) {
    if (!level) return 0;
    if (strcmp(level, "BAJO") == 0) return 10;
    if (strcmp(level, "MEDIO") == 0) return 20;
    if (strcmp(level, "ALTO") == 0) return 34;
    return 0;
}

PsuRisk psu_calculate_territorial_risk(const PsuIntersection *intersections, size_t count) {
    int sum = 0;
    for (size_t i = 0; i < count; i++) {
        sum += level_weight(intersections[i].level);
    }
    int score = sum > 100 ? 100 : sum;

    PsuRisk result;
    result.score = score;
    if (score >= 67) result.risk = "ALTO";
    else if (score >= 34) result.risk = "MEDIO";
    else result.risk = "BAJO";
    return result;
}
