#include "psu.h"

const PsuUbigeo *psu_get_region(const char *code) {
    return psu_get_department(code);
}
