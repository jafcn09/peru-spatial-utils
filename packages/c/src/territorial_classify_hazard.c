#include "psu.h"
#include "psu_data.h"
#include <string.h>
#include <ctype.h>

const char *psu_classify_hazard(const char *text) {
    char lower[1024];
    size_t i = 0;
    for (; text[i] && i < sizeof(lower) - 1; i++) {
        lower[i] = (char)tolower((unsigned char)text[i]);
    }
    lower[i] = '\0';

    for (size_t r = 0; r < psu_hazard_rules_count; r++) {
        for (size_t k = 0; k < psu_hazard_rules[r].keyword_count; k++) {
            if (strstr(lower, psu_hazard_rules[r].keywords[k])) {
                return psu_hazard_rules[r].type;
            }
        }
    }
    return psu_hazard_default;
}
