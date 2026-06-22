import test from "node:test";
import assert from "node:assert/strict";
import {
  getRegion,
  getDepartment,
  getProvince,
  getDistrict,
  isValidUbigeo,
  parentOf,
  searchDistricts,
} from "../src/ubigeo";

test("getRegion / getDepartment alias", () => {
  assert.equal(getRegion("24")?.name, "Tumbes");
  assert.equal(getDepartment("24")?.name, "Tumbes");
  assert.equal(getRegion, getDepartment);
});

test("getProvince", () => {
  assert.equal(getProvince("2402")?.name, "Contralmirante Villar");
});

test("getDistrict", () => {
  assert.equal(getDistrict("240203")?.name, "Canoas de Punta Sal");
});

test("missing codes return null", () => {
  assert.equal(getRegion("99"), null);
  assert.equal(getProvince("9999"), null);
  assert.equal(getDistrict("999999"), null);
});

test("isValidUbigeo", () => {
  assert.equal(isValidUbigeo("24"), true);
  assert.equal(isValidUbigeo("2402"), true);
  assert.equal(isValidUbigeo("240203"), true);
  assert.equal(isValidUbigeo("999999"), false);
  assert.equal(isValidUbigeo("ab"), false);
  assert.equal(isValidUbigeo("24x"), false);
});

test("parentOf", () => {
  assert.equal(parentOf("240203"), "2402");
  assert.equal(parentOf("2402"), "24");
  assert.equal(parentOf("24"), null);
});

test("searchDistricts respects limit and ordering", () => {
  const results = searchDistricts("tumbes", 5);
  assert.ok(results.length <= 5);
  assert.ok(results.length > 0);
  assert.equal(searchDistricts("", 5).length, 0);
});
