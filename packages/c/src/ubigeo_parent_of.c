#include "psu.h"
#include "psu_internal.h"
#include <string.h>

bool psu_parent_of(const char *code, char *out, size_t out_size) {
    if (!code) return false;
    size_t len = strlen(code);
    size_t parent_len;
    if (len == 6) parent_len = 4;
    else if (len == 4) parent_len = 2;
    else return false;
    if (out_size < parent_len + 1) return false;
    memcpy(out, code, parent_len);
    out[parent_len] = '\0';
    return true;
}
