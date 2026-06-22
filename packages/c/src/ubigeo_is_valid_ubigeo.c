#include "psu.h"
#include "psu_data.h"
#include "psu_internal.h"
#include <string.h>

bool psu_is_valid_ubigeo(const char *code) {
    if (!psu_all_digits(code)) return false;
    size_t len = strlen(code);
    if (len == 2) return psu_get_department(code) != NULL;
    if (len == 4) return psu_get_province(code) != NULL;
    if (len == 6) return psu_get_district(code) != NULL;
    return false;
}
