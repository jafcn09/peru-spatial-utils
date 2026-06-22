#include "psu.h"
#include "psu_data.h"
#include "psu_internal.h"

const PsuUbigeo *psu_get_district(const char *code) {
    return psu_lookup(psu_districts, psu_districts_count, code);
}
