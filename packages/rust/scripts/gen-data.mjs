import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, "../../../data");
const outDir = resolve(here, "../src/data");

const readJson = (p) => JSON.parse(readFileSync(resolve(dataDir, p), "utf8"));

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
const num = (n) => (Number.isFinite(n) ? String(n) : "0.0");
const flt = (n) => {
  const s = String(n);
  return s.includes(".") || s.includes("e") || s.includes("E") ? s : s + ".0";
};

const opt = (n) => (n == null ? "None" : `Some(${flt(n)})`);

const records = (rows) =>
  rows
    .map(
      (r) =>
        `    ("${esc(r.code)}", "${esc(r.name)}", "${esc(r.capital)}", ${opt(r.lat)}, ${opt(r.lng)}),`
    )
    .join("\n");

function genUbigeo() {
  const departments = readJson("ubigeo/departments.json");
  const provinces = readJson("ubigeo/provinces.json");
  const districts = readJson("ubigeo/districts.json");
  const out = `pub type Row = (&'static str, &'static str, &'static str, Option<f64>, Option<f64>);

pub static DEPARTMENTS: &[Row] = &[
${records(departments)}
];

pub static PROVINCES: &[Row] = &[
${records(provinces)}
];

pub static DISTRICTS: &[Row] = &[
${records(districts)}
];
`;
  writeFileSync(resolve(outDir, "ubigeo.rs"), out);
}

function genCrs() {
  const j = readJson("crs/utm-zones.json");
  const e = j.ellipsoid;
  const zones = j.zones
    .map(
      (z) =>
        `    Zone { zone: ${z.zone}, hemisphere: "${esc(z.hemisphere)}", epsg: ${z.epsg}, central_meridian: ${flt(z.centralMeridian)}, lng_min: ${flt(z.lngMin)}, lng_max: ${flt(z.lngMax)} },`
    )
    .join("\n");
  const out = `pub struct Zone {
    pub zone: i32,
    pub hemisphere: &'static str,
    pub epsg: i32,
    pub central_meridian: f64,
    pub lng_min: f64,
    pub lng_max: f64,
}

pub const A: f64 = ${flt(e.a)};
pub const F: f64 = ${flt(e.f)};
pub const K0: f64 = ${flt(e.k0)};
pub const FALSE_EASTING: f64 = ${flt(e.falseEasting)};
pub const FALSE_NORTHING_SOUTH: f64 = ${flt(e.falseNorthingSouth)};

pub static ZONES: &[Zone] = &[
${zones}
];
`;
  writeFileSync(resolve(outDir, "crs.rs"), out);
}

function genTerritorial() {
  const rec = readJson("territorial/recommendations.json");
  const haz = readJson("territorial/hazard-keywords.json");

  const entities = Object.entries(rec.entities)
    .map(([k, v]) => `    ("${esc(k)}", "${esc(v)}"),`)
    .join("\n");

  const rules = haz.rules
    .map(
      (r) =>
        `    ("${esc(r.type)}", &[${r.keywords.map((k) => `"${esc(k)}"`).join(", ")}]),`
    )
    .join("\n");

  const catFallback = Object.entries(haz.categoryFallback)
    .map(([k, v]) => `    ("${esc(k)}", "${esc(v)}"),`)
    .join("\n");

  const out = `pub static ENTITIES: &[(&str, &str)] = &[
${entities}
];

pub const FALLBACK: &str = "${esc(rec.fallback)}";

pub static RULES: &[(&str, &[&str])] = &[
${rules}
];

pub static CATEGORY_FALLBACK: &[(&str, &str)] = &[
${catFallback}
];

pub const HAZARD_DEFAULT: &str = "${esc(haz.default)}";
`;
  writeFileSync(resolve(outDir, "territorial.rs"), out);
}

function genMod() {
  const out = `pub mod ubigeo;
pub mod crs;
pub mod territorial;
`;
  writeFileSync(resolve(outDir, "mod.rs"), out);
}

genUbigeo();
genCrs();
genTerritorial();
genMod();
console.log("generated rust data sources in", outDir);
