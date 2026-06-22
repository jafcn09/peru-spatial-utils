#include "psu.h"

PsuBoundingBox psu_bounding_box_coords(const double *coords, size_t pair_count) {
    PsuBoundingBox box = { 0.0, 0.0, 0.0, 0.0 };
    if (pair_count == 0) return box;
    box.minX = box.maxX = coords[0];
    box.minY = box.maxY = coords[1];
    for (size_t i = 1; i < pair_count; i++) {
        double x = coords[i * 2];
        double y = coords[i * 2 + 1];
        if (x < box.minX) box.minX = x;
        if (x > box.maxX) box.maxX = x;
        if (y < box.minY) box.minY = y;
        if (y > box.maxY) box.maxY = y;
    }
    return box;
}
