#include "psu.h"
#include <string.h>

size_t psu_generate_recommendations(const char **entities, size_t count,
                                    char (*out)[512], size_t out_cap) {
    const char *seen[256];
    size_t seen_count = 0;
    size_t w = 0;
    for (size_t i = 0; i < count && w < out_cap; i++) {
        bool dup = false;
        for (size_t j = 0; j < seen_count; j++) {
            if (strcmp(seen[j], entities[i]) == 0) {
                dup = true;
                break;
            }
        }
        if (dup) continue;
        if (seen_count < sizeof(seen) / sizeof(seen[0])) {
            seen[seen_count++] = entities[i];
        }
        psu_recommendation_for(entities[i], out[w], 512);
        w++;
    }
    return w;
}
