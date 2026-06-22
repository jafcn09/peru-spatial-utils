# peru-spatial-utils

Lightweight spatial and territorial utilities for Peru: INEI ubigeos, UTM/WGS84
coordinate conversion, area/distance/bounding-box helpers and territorial
heuristics. Zero runtime dependencies, embedded dataset.

Part of a polyglot project (TypeScript, Python, Dart, Go, Java, Rust, C). Source:
https://github.com/jafcn09/peru-spatial-utils

## Install

```sh
npm install peru-spatial-utils
```

## Usage

```ts
import {
  getRegion, getProvince, getDistrict, isValidUbigeo,
  toUTM, toWGS84, toHectares, toKm2, formatArea,
  distance, boundingBox,
  recommendationFor, classifyHazard, calculateTerritorialRisk,
} from "peru-spatial-utils";

getRegion("24");          // { code: "24", name: "Tumbes", ... }
getDistrict("240203");    // { name: "Canoas de Punta Sal", ... }
isValidUbigeo("240203");  // true

toUTM(-3.683, -80.451);
// { zone: 17, hemisphere: "S", epsg: 32717, easting: 560966, northing: 9592893 }

formatArea(467443.66);    // "467,443.66 m² (46.74 ha)"
distance([-80.451, -3.683], [-80.320, -3.561]); // 19.8839 (km)

boundingBox(geojson);     // { minX, minY, maxX, maxY }
calculateTerritorialRisk(intersections); // { risk, score }
```

## Notes

Coordinate conversion uses the standard Transverse Mercator series on the WGS84
datum (UTM zones 17S/18S/19S). Ubigeo data uses official INEI codes. Territorial
risk and recommendations are heuristics for guidance only.

## License

MIT - Jhafet Canepa Maceda
