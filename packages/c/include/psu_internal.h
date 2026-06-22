#ifndef PSU_INTERNAL_H
#define PSU_INTERNAL_H

#include <stddef.h>
#include <stdbool.h>
#include "psu.h"

void psu_normalize(const char *text, char *out, size_t out_size);
bool psu_all_digits(const char *code);
const PsuUbigeo *psu_lookup(const PsuUbigeo *rows, size_t count, const char *code);

#endif
