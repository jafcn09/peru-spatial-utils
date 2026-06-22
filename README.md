# peru-spatial-utils

Lightweight, polyglot toolkit for Peruvian spatial data: INEI ubigeos, UTM/WGS84
coordinate conversion, area/distance/bounding-box helpers, and territorial
heuristics. One canonical dataset, one shared specification, idiomatic packages
for **TypeScript, Python, Dart, Go, Java, Rust and C**.

> Read this in Spanish: [README.es.md](README.es.md)

## Why

Everyone working with Peruvian geodata reimplements ubigeos and UTM conversion by
hand. This library extracts that logic from a production GeoPortal, fixes the
datum/zone gaps, and ships it the same way to every language. Total footprint is
well under 20 MB; the heavy value is data, not binaries.

## Packages

| Language   | Path                   |
|------------|------------------------|
| TypeScript | `packages/typescript`  |
| Python     | `packages/python`      |
| Dart       | `packages/dart`        |
| Go         | `packages/go`          |
| Java       | `packages/java`        |
| Rust       | `packages/rust`        |
| C          | `packages/c`           |

Every package implements the same API ([SPEC.md](SPEC.md)) and is verified
against the same golden vectors.

## Features

1. **Ubigeos** - `getRegion`, `getProvince`, `getDistrict`, `isValidUbigeo`,
   `searchDistricts`, `parentOf` over the full INEI dataset (25 / 196 / 1893).
2. **Coordinates** - `toUTM`, `toWGS84`, `utmZoneFor` for UTM zones 17S/18S/19S
   on the WGS84 datum (explicit, not assumed).
3. **Areas** - `toHectares`, `toKm2`, `formatArea`.
4. **Distance** - `distance` (haversine, kilometers).
5. **Bounding box** - `boundingBox` over any GeoJSON geometry.
6. **Territorial** - `recommendationFor`, `generateRecommendations`,
   `classifyHazard`, `riskLevelToScore`, `calculateTerritorialRisk`,
   `generateTerritorialSummary` (documented heuristics, guidance only).

## Quick look

```ts
getRegion("24")          // -> { code:"24", name:"Tumbes", ... }
getDistrict("240203")    // -> { name:"Canoas de Punta Sal", ... }
isValidUbigeo("240203")  // -> true

toUTM(-3.683, -80.451)
// -> { zone:17, hemisphere:"S", epsg:32717, easting:560966, northing:9592893 }

formatArea(467443.66)    // -> "467,443.66 m² (46.74 ha)"
distance([-80.451,-3.683], [-80.320,-3.561])  // -> 19.8839 (km)
```

## Data

The canonical datasets live in `data/` and are consumed by every package:

- `data/ubigeo/{departments,provinces,districts}.json`
- `data/crs/utm-zones.json`
- `data/territorial/{recommendations,hazard-keywords}.json`

## Accuracy note

Coordinate conversion uses the standard Transverse Mercator series on WGS84 and
round-trips to sub-meter precision. The territorial risk score and
recommendations are heuristics and do not replace the technical opinion of the
competent authorities (SERNANP, INGEMMET, SUNARP, SERFOR, MIDAGRI).

## License and attribution

MIT - see [LICENSE](LICENSE).

The ubigeo dataset (`data/ubigeo/*`) uses the official INEI ubigeo codes and
names, public administrative data of Peru. The territorial rules and risk
heuristics are guidance only and do not replace the technical opinion of the
competent authorities (SERNANP, INGEMMET, SUNARP, SERFOR, MIDAGRI).

Run `node scripts/update-year.mjs` to stamp the current year below.

<!-- year:start -->2026<!-- year:end --> Jhafet Canepa Maceda
