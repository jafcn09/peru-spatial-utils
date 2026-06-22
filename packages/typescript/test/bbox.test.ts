import test from "node:test";
import assert from "node:assert/strict";
import { boundingBox } from "../src/bbox";

test("boundingBox of Polygon", () => {
  const polygon = {
    type: "Polygon",
    coordinates: [
      [
        [-80.56, -3.82],
        [-80.11, -3.82],
        [-80.11, -3.42],
        [-80.56, -3.42],
        [-80.56, -3.82],
      ],
    ],
  };
  assert.deepEqual(boundingBox(polygon), {
    minX: -80.56,
    minY: -3.82,
    maxX: -80.11,
    maxY: -3.42,
  });
});

test("boundingBox of Feature and FeatureCollection", () => {
  const point = { type: "Point", coordinates: [-80.2, -3.5] };
  const feature = { type: "Feature", geometry: point, properties: {} };
  assert.deepEqual(boundingBox(feature), {
    minX: -80.2,
    minY: -3.5,
    maxX: -80.2,
    maxY: -3.5,
  });

  const fc = {
    type: "FeatureCollection",
    features: [
      feature,
      { type: "Feature", geometry: { type: "Point", coordinates: [-79.0, -2.0] }, properties: {} },
    ],
  };
  assert.deepEqual(boundingBox(fc), {
    minX: -80.2,
    minY: -3.5,
    maxX: -79.0,
    maxY: -2.0,
  });
});
