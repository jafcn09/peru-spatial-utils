#include "psu_internal.h"
#include "psu_data.h"
#include <string.h>
#include <ctype.h>

static int decode_utf8(const unsigned char *s, unsigned int *cp) {
    unsigned char c = s[0];
    if (c < 0x80) {
        *cp = c;
        return 1;
    }
    if ((c & 0xE0) == 0xC0) {
        *cp = ((c & 0x1Fu) << 6) | (s[1] & 0x3Fu);
        return 2;
    }
    if ((c & 0xF0) == 0xE0) {
        *cp = ((c & 0x0Fu) << 12) | ((s[1] & 0x3Fu) << 6) | (s[2] & 0x3Fu);
        return 3;
    }
    if ((c & 0xF8) == 0xF0) {
        *cp = ((c & 0x07u) << 18) | ((s[1] & 0x3Fu) << 12) |
              ((s[2] & 0x3Fu) << 6) | (s[3] & 0x3Fu);
        return 4;
    }
    *cp = c;
    return 1;
}

static unsigned int strip_accent(unsigned int cp) {
    if (cp >= 0x00C0 && cp <= 0x00FF) {
        static const char map[] =
            "AAAAAAECEEEEIIIIDNOOOOOxOUUUUYTs"
            "aaaaaaeceeeeiiiidnooooo/ouuuuyty";
        return (unsigned char)map[cp - 0x00C0];
    }
    if (cp >= 0x0100 && cp <= 0x017F) {
        static const char map[] =
            "AaAaAaCcCcCcCcDdDdEeEeEeEeEeGgGgGgGgHhHh"
            "IiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnnNnOoOoOo"
            "OoRrRrRrSsSsSsSsTtTtTtUuUuUuUuUuUuWwYyYZz"
            "ZzZzs";
        return (unsigned char)map[cp - 0x0100];
    }
    return cp;
}

void psu_normalize(const char *text, char *out, size_t out_size) {
    if (out_size == 0) return;
    const unsigned char *s = (const unsigned char *)text;
    size_t start = 0, end = strlen(text);
    while (start < end && isspace((unsigned char)text[start])) start++;
    while (end > start && isspace((unsigned char)text[end - 1])) end--;

    size_t w = 0;
    size_t i = start;
    while (i < end && w + 1 < out_size) {
        unsigned int cp;
        int n = decode_utf8(s + i, &cp);
        if ((size_t)(i + n) > end) break;
        i += n;
        unsigned int base = strip_accent(cp);
        if (base < 0x80) {
            char ch = (char)tolower((int)base);
            out[w++] = ch;
        }
    }
    out[w] = '\0';
}

bool psu_all_digits(const char *code) {
    if (!code || *code == '\0') return false;
    for (const char *p = code; *p; p++) {
        if (*p < '0' || *p > '9') return false;
    }
    return true;
}

const PsuUbigeo *psu_lookup(const PsuUbigeo *rows, size_t count, const char *code) {
    if (!code) return NULL;
    for (size_t i = 0; i < count; i++) {
        if (strcmp(rows[i].code, code) == 0) return &rows[i];
    }
    return NULL;
}
