import test from "node:test";
import assert from "node:assert/strict";
import { utmZoneFor, toUTM, toWGS84 } from "../src/crs";

test("utmZoneFor", () => {
  assert.equal(utmZoneFor(-80.451), 17);
  assert.equal(utmZoneFor(-77.0428), 18);
  assert.equal(utmZoneFor(-71.9675), 19);
});

test("toUTM zone 17", () => {
  assert.deepEqual(toUTM(-3.683, -80.451), {
    zone: 17,
    hemisphere: "S",
    epsg: 32717,
    easting: 560966,
    northing: 9592893,
  });
});

test("toUTM zone 18", () => {
  const r = toUTM(-12.0464, -77.0428);
  assert.equal(r.zone, 18);
  assert.equal(r.epsg, 32718);
  assert.equal(r.easting, 277617);
  assert.equal(r.northing, 8667488);
});

test("toUTM zone 19", () => {
  const r = toUTM(-13.532, -71.9675);
  assert.equal(r.zone, 19);
  assert.equal(r.epsg, 32719);
  assert.equal(r.easting, 178771);
  assert.equal(r.northing, 8502083);
});

test("toWGS84 inverse", () => {
  const r = toWGS84(560966, 9592893, 17);
  assert.ok(Math.abs(r.lat - -3.683) < 1e-4, `lat ${r.lat}`);
  assert.ok(Math.abs(r.lng - -80.451) < 1e-4, `lng ${r.lng}`);
});
