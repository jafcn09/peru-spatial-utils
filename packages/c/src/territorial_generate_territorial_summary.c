#include "psu.h"
#include <string.h>
#include <stdio.h>

const char *psu_generate_territorial_summary(const PsuIntersection *intersections, size_t count,
                                             char *out, size_t out_size) {
    if (count == 0) {
        snprintf(out, out_size, "El territorio no presenta superposiciones con las capas evaluadas.");
        return out;
    }

    const char *dominant = "BAJO";
    int dominant_score = 0;
    for (size_t i = 0; i < count; i++) {
        int s = psu_risk_level_to_score(intersections[i].level);
        if (s > dominant_score) {
            dominant_score = s;
            dominant = intersections[i].level;
        }
    }

    char entities[2048];
    size_t w = 0;
    for (size_t i = 0; i < count; i++) {
        const char *e = intersections[i].entity ? intersections[i].entity : "";
        if (i > 0) {
            int n = snprintf(entities + w, sizeof(entities) - w, ", ");
            if (n > 0) w += (size_t)n;
        }
        int n = snprintf(entities + w, sizeof(entities) - w, "%s", e);
        if (n > 0) w += (size_t)n;
        if (w >= sizeof(entities)) {
            w = sizeof(entities) - 1;
            break;
        }
    }

    snprintf(out, out_size,
             "El territorio presenta superposicion de nivel %s con %zu entidad(es): %s.",
             dominant, count, entities);
    return out;
}
