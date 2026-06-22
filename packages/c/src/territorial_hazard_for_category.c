#include "psu.h"
#include "psu_data.h"
#include <string.h>

const char *psu_hazard_for_category(const char *category) {
    for (size_t i = 0; i < psu_category_fallback_count; i++) {
        if (strcmp(psu_category_fallback[i].key, category) == 0) {
            return psu_category_fallback[i].value;
        }
    }
    return psu_hazard_default;
}
