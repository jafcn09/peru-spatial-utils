import test from "node:test";
import assert from "node:assert/strict";
import {
  recommendationFor,
  generateRecommendations,
  classifyHazard,
  hazardForCategory,
  riskLevelToScore,
  calculateTerritorialRisk,
  generateTerritorialSummary,
} from "../src/territorial";

test("recommendationFor known", () => {
  assert.ok(
    recommendationFor("SERNANP").startsWith(
      "El territorio se superpone con un Area"
    )
  );
});

test("recommendationFor fallback", () => {
  assert.equal(
    recommendationFor("XYZ"),
    "Verificar la normativa aplicable de XYZ antes de cualquier intervencion en el territorio."
  );
});

test("generateRecommendations dedupes preserving order", () => {
  const r = generateRecommendations(["XYZ", "XYZ", "ABC"]);
  assert.equal(r.length, 2);
  assert.ok(r[0].includes("XYZ"));
  assert.ok(r[1].includes("ABC"));
});

test("classifyHazard", () => {
  assert.equal(classifyHazard("Zona de inundacion recurrente"), "flood");
  assert.equal(classifyHazard("Alerta de tsunami"), "tsunami");
  assert.equal(classifyHazard("evento desconocido"), "earthquake");
});

test("hazardForCategory", () => {
  assert.equal(hazardForCategory("AMBIENTAL"), "flood");
  assert.equal(hazardForCategory("DESCONOCIDO"), "earthquake");
});

test("riskLevelToScore", () => {
  assert.equal(riskLevelToScore("BAJO"), 1);
  assert.equal(riskLevelToScore("MEDIO"), 2);
  assert.equal(riskLevelToScore("ALTO"), 3);
  assert.equal(riskLevelToScore("NADA"), 0);
});

test("calculateTerritorialRisk", () => {
  assert.deepEqual(
    calculateTerritorialRisk([{ level: "ALTO" }, { level: "MEDIO" }]),
    { score: 54, risk: "MEDIO" }
  );
  assert.deepEqual(
    calculateTerritorialRisk([{ level: "ALTO" }, { level: "ALTO" }]),
    { score: 68, risk: "ALTO" }
  );
  assert.deepEqual(calculateTerritorialRisk([]), { score: 0, risk: "BAJO" });
});

test("generateTerritorialSummary", () => {
  assert.equal(
    generateTerritorialSummary([]),
    "El territorio no presenta superposiciones con las capas evaluadas."
  );
  assert.equal(
    generateTerritorialSummary([
      { entity: "SERNANP", level: "ALTO" },
      { entity: "INGEMMET", level: "MEDIO" },
    ]),
    "El territorio presenta superposicion de nivel ALTO con 2 entidad(es): SERNANP, INGEMMET."
  );
});
