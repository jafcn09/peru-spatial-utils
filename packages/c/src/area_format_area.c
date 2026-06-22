#include "psu.h"
#include <stdio.h>
#include <string.h>

static void group_thousands(const char *plain, char *out) {
    const char *dot = strchr(plain, '.');
    size_t int_len = dot ? (size_t)(dot - plain) : strlen(plain);
    size_t start = 0;
    size_t w = 0;
    if (plain[0] == '-') {
        out[w++] = '-';
        start = 1;
    }
    size_t digits = int_len - start;
    for (size_t i = start; i < int_len; i++) {
        out[w++] = plain[i];
        size_t remaining = int_len - 1 - i;
        if (remaining > 0 && remaining % 3 == 0) out[w++] = ',';
    }
    (void)digits;
    if (dot) {
        strcpy(out + w, dot);
    } else {
        out[w] = '\0';
    }
}

void psu_format_area(double m2, char *out, size_t out_size) {
    char m2_plain[64];
    char m2_grouped[96];
    char ha_str[64];
    snprintf(m2_plain, sizeof(m2_plain), "%.2f", m2);
    group_thousands(m2_plain, m2_grouped);
    snprintf(ha_str, sizeof(ha_str), "%.2f", psu_to_hectares(m2));
    snprintf(out, out_size, "%s m\xC2\xB2 (%s ha)", m2_grouped, ha_str);
}
