const fs = require("fs");
const path = require("path");

const DATA = path.resolve(__dirname, "../../../data");
const OUT = path.resolve(__dirname, "../src/com/peruspatial/data");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function javaStr(s) {
  return '"' + String(s)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t") + '"';
}

function num(n) {
  if (Number.isInteger(n)) return n + ".0";
  return String(n);
}

function dbl(n) {
  if (n === null || n === undefined) return "null";
  if (Number.isInteger(n)) return n + ".0";
  return String(n);
}

function genUbigeo() {
  const departments = readJson(path.join(DATA, "ubigeo/departments.json"));
  const provinces = readJson(path.join(DATA, "ubigeo/provinces.json"));
  const districts = readJson(path.join(DATA, "ubigeo/districts.json"));

  function recordLine(r) {
    return `      new UbigeoRecord(${javaStr(r.code)}, ${javaStr(r.name)}, ${javaStr(r.capital)}, ${dbl(r.lat)}, ${dbl(r.lng)})`;
  }

  const CHUNK = 200;

  function buildList(name, list) {
    const methods = [];
    const calls = [];
    for (let i = 0; i < list.length; i += CHUNK) {
      const slice = list.slice(i, i + CHUNK);
      const m = `${name}Chunk${i / CHUNK}`;
      methods.push(
        `  private static List<UbigeoRecord> ${m}() {\n    return List.of(\n${slice.map(recordLine).join(",\n")}\n    );\n  }`
      );
      calls.push(`    out.addAll(${m}());`);
    }
    const field = `  public static final List<UbigeoRecord> ${name} = ${name}Build();`;
    const builder = `  private static List<UbigeoRecord> ${name}Build() {\n    List<UbigeoRecord> out = new ArrayList<>();\n${calls.join("\n")}\n    return List.copyOf(out);\n  }`;
    return { field, methods: [builder, ...methods] };
  }

  const dep = buildList("DEPARTMENTS", departments);
  const prov = buildList("PROVINCES", provinces);
  const dist = buildList("DISTRICTS", districts);

  const src = `package com.peruspatial.data;

import com.peruspatial.ubigeo.UbigeoRecord;
import java.util.ArrayList;
import java.util.List;

public final class UbigeoData {
  private UbigeoData() {}

${dep.field}
${prov.field}
${dist.field}

${dep.methods.join("\n\n")}

${prov.methods.join("\n\n")}

${dist.methods.join("\n\n")}
}
`;
  fs.writeFileSync(path.join(OUT, "UbigeoData.java"), src);
  console.log("UbigeoData.java", departments.length, provinces.length, districts.length);
}

function genCrs() {
  const crs = readJson(path.join(DATA, "crs/utm-zones.json"));
  const e = crs.ellipsoid;
  const zones = crs.zones
    .map(
      (z) =>
        `    new Zone(${z.zone}, ${javaStr(z.hemisphere)}, ${z.epsg}, ${num(z.centralMeridian)}, ${num(z.lngMin)}, ${num(z.lngMax)})`
    )
    .join(",\n");

  const src = `package com.peruspatial.data;

import java.util.List;

public final class CrsData {
  private CrsData() {}

  public static final double A = ${num(e.a)};
  public static final double F = ${e.f};
  public static final double K0 = ${num(e.k0)};
  public static final double FALSE_EASTING = ${num(e.falseEasting)};
  public static final double FALSE_NORTHING_SOUTH = ${num(e.falseNorthingSouth)};

  public record Zone(int zone, String hemisphere, int epsg, double centralMeridian, double lngMin, double lngMax) {}

  public static final List<Zone> ZONES = List.of(
${zones}
  );
}
`;
  fs.writeFileSync(path.join(OUT, "CrsData.java"), src);
  console.log("CrsData.java");
}

function genTerritorial() {
  const recs = readJson(path.join(DATA, "territorial/recommendations.json"));
  const haz = readJson(path.join(DATA, "territorial/hazard-keywords.json"));

  const entityEntries = Object.entries(recs.entities)
    .map(([k, v]) => `    ENTITIES.put(${javaStr(k)}, ${javaStr(v)});`)
    .join("\n");

  const rules = haz.rules
    .map((r) => {
      const kws = r.keywords.map(javaStr).join(", ");
      return `    new Rule(${javaStr(r.type)}, List.of(${kws}))`;
    })
    .join(",\n");

  const catEntries = Object.entries(haz.categoryFallback)
    .map(([k, v]) => `    CATEGORY_FALLBACK.put(${javaStr(k)}, ${javaStr(v)});`)
    .join("\n");

  const src = `package com.peruspatial.data;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class TerritorialData {
  private TerritorialData() {}

  public static final Map<String, String> ENTITIES = new LinkedHashMap<>();
  public static final String FALLBACK = ${javaStr(recs.fallback)};

  public record Rule(String type, List<String> keywords) {}

  public static final List<Rule> RULES = List.of(
${rules}
  );

  public static final Map<String, String> CATEGORY_FALLBACK = new LinkedHashMap<>();
  public static final String DEFAULT_HAZARD = ${javaStr(haz.default)};

  static {
${entityEntries}
${catEntries}
  }
}
`;
  fs.writeFileSync(path.join(OUT, "TerritorialData.java"), src);
  console.log("TerritorialData.java");
}

genUbigeo();
genCrs();
genTerritorial();
console.log("data generation done");
