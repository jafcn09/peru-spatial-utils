#include "psu.h"
#include "psu_data.h"
#include "psu_internal.h"

const PsuUbigeo *psu_get_province(const char *code) {
    return psu_lookup(psu_provinces, psu_provinces_count, code);
}
