#include "psu.h"
#include <string.h>

int psu_risk_level_to_score(const char *level) {
    if (!level) return 0;
    if (strcmp(level, "BAJO") == 0) return 1;
    if (strcmp(level, "MEDIO") == 0) return 2;
    if (strcmp(level, "ALTO") == 0) return 3;
    return 0;
}
