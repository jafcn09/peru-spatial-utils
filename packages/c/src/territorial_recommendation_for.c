#include "psu.h"
#include "psu_data.h"
#include <string.h>
#include <stdio.h>

const char *psu_recommendation_for(const char *entity, char *buf, size_t buf_size) {
    for (size_t i = 0; i < psu_recommendations_count; i++) {
        if (strcmp(psu_recommendations[i].key, entity) == 0) {
            return psu_recommendations[i].value;
        }
    }
    const char *tpl = psu_recommendation_fallback;
    const char *ph = strstr(tpl, "{entity}");
    if (!ph || buf_size == 0) {
        if (buf_size > 0) snprintf(buf, buf_size, "%s", tpl);
        return buf;
    }
    size_t prefix = (size_t)(ph - tpl);
    snprintf(buf, buf_size, "%.*s%s%s", (int)prefix, tpl, entity, ph + strlen("{entity}"));
    return buf;
}
