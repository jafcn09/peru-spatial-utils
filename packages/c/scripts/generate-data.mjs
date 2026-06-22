import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(here, "..");
const dataRoot = join(pkgRoot, "..", "..", "data");

const read = (p) => JSON.parse(readFileSync(join(dataRoot, p), "utf8"));

const departments = read("ubigeo/departments.json");
const provinces = read("ubigeo/provinces.json");
const districts = read("ubigeo/districts.json");
const utm = read("crs/utm-zones.json");
const recommendations = read("territorial/recommendations.json");
const hazards = read("territorial/hazard-keywords.json");

const esc = (s) =>
  String(s)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");

const num = (n) => {
  if (n === null || n === undefined) return "NAN";
  const s = String(n);
  return s.includes(".") || s.includes("e") || s.includes("E") ? s : `${s}.0`;
};

const normalize = (text) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase();

function records(name, rows, withNorm) {
  const lines = rows.map((r) => {
    const base = `  { "${esc(r.code)}", "${esc(r.name)}", "${esc(r.capital)}", ${num(r.lat)}, ${num(r.lng)} }`;
    return base;
  });
  let out = `const PsuUbigeo ${name}[] = {\n${lines.join(",\n")}\n};\n`;
  out += `const size_t ${name}_count = ${rows.length};\n`;
  if (withNorm) {
    const norms = rows.map((r) => `  "${esc(normalize(r.name))}"`);
    out += `const char *${name}_norm[] = {\n${norms.join(",\n")}\n};\n`;
  }
  return out;
}

let c = `#include "psu_data.h"\n\n`;
c += records("psu_departments", departments, false);
c += "\n";
c += records("psu_provinces", provinces, false);
c += "\n";
c += records("psu_districts", districts, true);
c += "\n";

const zones = utm.zones
  .map(
    (z) =>
      `  { ${z.zone}, "${esc(z.hemisphere)}", ${z.epsg}, ${num(z.centralMeridian)}, ${num(z.lngMin)}, ${num(z.lngMax)} }`
  )
  .join(",\n");
c += `const PsuUtmZone psu_utm_zones[] = {\n${zones}\n};\n`;
c += `const size_t psu_utm_zones_count = ${utm.zones.length};\n`;
c += `const double psu_utm_a = ${num(utm.ellipsoid.a)};\n`;
c += `const double psu_utm_f = ${num(utm.ellipsoid.f)};\n`;
c += `const double psu_utm_k0 = ${num(utm.ellipsoid.k0)};\n`;
c += `const double psu_utm_false_easting = ${num(utm.ellipsoid.falseEasting)};\n`;
c += `const double psu_utm_false_northing_south = ${num(utm.ellipsoid.falseNorthingSouth)};\n\n`;

const recEntries = Object.entries(recommendations.entities)
  .map(([k, v]) => `  { "${esc(k)}", "${esc(v)}" }`)
  .join(",\n");
c += `const PsuKeyValue psu_recommendations[] = {\n${recEntries}\n};\n`;
c += `const size_t psu_recommendations_count = ${Object.keys(recommendations.entities).length};\n`;
c += `const char *psu_recommendation_fallback = "${esc(recommendations.fallback)}";\n\n`;

const ruleBlocks = [];
const ruleEntries = hazards.rules
  .map((rule, i) => {
    const kw = rule.keywords.map((k) => `"${esc(k)}"`).join(", ");
    ruleBlocks.push(`static const char *psu_rule_kw_${i}[] = { ${kw} };`);
    return `  { "${esc(rule.type)}", psu_rule_kw_${i}, ${rule.keywords.length} }`;
  })
  .join(",\n");
c += ruleBlocks.join("\n") + "\n";
c += `const PsuHazardRule psu_hazard_rules[] = {\n${ruleEntries}\n};\n`;
c += `const size_t psu_hazard_rules_count = ${hazards.rules.length};\n`;

const catEntries = Object.entries(hazards.categoryFallback)
  .map(([k, v]) => `  { "${esc(k)}", "${esc(v)}" }`)
  .join(",\n");
c += `const PsuKeyValue psu_category_fallback[] = {\n${catEntries}\n};\n`;
c += `const size_t psu_category_fallback_count = ${Object.keys(hazards.categoryFallback).length};\n`;
c += `const char *psu_hazard_default = "${esc(hazards.default)}";\n`;

const h = `#ifndef PSU_DATA_H
#define PSU_DATA_H

#include <stddef.h>
#include <math.h>
#include "psu.h"

typedef struct {
    int zone;
    const char *hemisphere;
    int epsg;
    double centralMeridian;
    double lngMin;
    double lngMax;
} PsuUtmZone;

typedef struct {
    const char *key;
    const char *value;
} PsuKeyValue;

typedef struct {
    const char *type;
    const char **keywords;
    size_t keyword_count;
} PsuHazardRule;

extern const PsuUbigeo psu_departments[];
extern const size_t psu_departments_count;
extern const PsuUbigeo psu_provinces[];
extern const size_t psu_provinces_count;
extern const PsuUbigeo psu_districts[];
extern const size_t psu_districts_count;
extern const char *psu_districts_norm[];

extern const PsuUtmZone psu_utm_zones[];
extern const size_t psu_utm_zones_count;
extern const double psu_utm_a;
extern const double psu_utm_f;
extern const double psu_utm_k0;
extern const double psu_utm_false_easting;
extern const double psu_utm_false_northing_south;

extern const PsuKeyValue psu_recommendations[];
extern const size_t psu_recommendations_count;
extern const char *psu_recommendation_fallback;

extern const PsuHazardRule psu_hazard_rules[];
extern const size_t psu_hazard_rules_count;
extern const PsuKeyValue psu_category_fallback[];
extern const size_t psu_category_fallback_count;
extern const char *psu_hazard_default;

#endif
`;

writeFileSync(join(pkgRoot, "src", "psu_data.c"), c);
writeFileSync(join(pkgRoot, "include", "psu_data.h"), h);
console.log("generated src/psu_data.c and include/psu_data.h");
