#include "psu.h"
#include "psu_data.h"
#include "psu_internal.h"
#include <string.h>

static int match_rank(const char *name, const char *q) {
    if (q[0] == '\0') return -1;
    const char *found = strstr(name, q);
    if (!found) return -1;
    if (strcmp(name, q) == 0) return 0;
    if (found == name) return 1;
    if (*(found - 1) == ' ') return 2;
    return 3;
}

size_t psu_search_districts(const char *query, int limit, const PsuUbigeo **out, size_t out_cap) {
    if (limit <= 0 || out_cap == 0 || !query) return 0;
    char q[256];
    psu_normalize(query, q, sizeof(q));
    if (q[0] == '\0') return 0;

    size_t want = (size_t)limit < out_cap ? (size_t)limit : out_cap;
    size_t found = 0;
    for (int rank = 0; rank <= 3 && found < want; rank++) {
        for (size_t i = 0; i < psu_districts_count && found < want; i++) {
            if (match_rank(psu_districts_norm[i], q) == rank) {
                out[found++] = &psu_districts[i];
            }
        }
    }
    return found;
}
