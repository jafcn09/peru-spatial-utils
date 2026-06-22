#include "psu.h"
#include "psu_data.h"
#include "psu_internal.h"

const PsuUbigeo *psu_get_department(const char *code) {
    return psu_lookup(psu_departments, psu_departments_count, code);
}
