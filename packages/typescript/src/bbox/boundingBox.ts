import type { BoundingBox } from "../types";

type GeoJson = any;

function walk(coords: GeoJson, acc: BoundingBox): void {
  if (Array.isArray(coords)) {
    if (
      coords.length >= 2 &&
      typeof coords[0] === "number" &&
      typeof coords[1] === "number"
    ) {
      const [x, y] = coords as [number, number];
      if (x < acc.minX) acc.minX = x;
      if (x > acc.maxX) acc.maxX = x;
      if (y < acc.minY) acc.minY = y;
      if (y > acc.maxY) acc.maxY = y;
      return;
    }
    for (const child of coords) {
      walk(child, acc);
    }
  }
}

function collect(node: GeoJson, acc: BoundingBox): void {
  if (!node || typeof node !== "object") {
    return;
  }
  switch (node.type) {
    case "FeatureCollection":
      for (const feature of node.features ?? []) {
        collect(feature, acc);
      }
      return;
    case "Feature":
      collect(node.geometry, acc);
      return;
    case "GeometryCollection":
      for (const geometry of node.geometries ?? []) {
        collect(geometry, acc);
      }
      return;
    default:
      if (node.coordinates !== undefined) {
        walk(node.coordinates, acc);
      }
  }
}

export function boundingBox(geojson: GeoJson): BoundingBox {
  const acc: BoundingBox = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
  };
  collect(geojson, acc);
  return acc;
}
