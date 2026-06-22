import test from "node:test";
import assert from "node:assert/strict";
import { toHectares, toKm2, formatArea } from "../src/area";

test("toHectares", () => {
  assert.equal(toHectares(467443.66), 46.744366);
});

test("toKm2", () => {
  assert.equal(toKm2(467443.66), 0.46744366);
});

test("formatArea", () => {
  assert.equal(formatArea(467443.66), "467,443.66 m² (46.74 ha)");
});
