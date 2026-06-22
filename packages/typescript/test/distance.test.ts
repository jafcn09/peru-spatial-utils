import test from "node:test";
import assert from "node:assert/strict";
import { distance } from "../src/distance";

test("distance haversine", () => {
  const d = distance([-80.451, -3.683], [-80.32, -3.561]);
  assert.ok(Math.abs(d - 19.8839) < 1e-3, `distance ${d}`);
});
