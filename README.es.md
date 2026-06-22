# peru-spatial-utils

Conjunto de utilidades liviano y multilenguaje para datos espaciales del Peru:
ubigeos INEI, conversion de coordenadas UTM/WGS84, ayudas de area, distancia y
bounding box, y heuristicas territoriales. Un solo dataset canonico, una sola
especificacion compartida, paquetes idiomaticos para **TypeScript, Python, Dart,
Go, Java, Rust y C**.

> Read this in English: [README.md](README.md)

## Por que

Casi todos los que trabajan con geodatos del Peru reimplementan ubigeos y la
conversion UTM a mano. Esta libreria extrae esa logica de un GeoPortal en
produccion, corrige los vacios de datum y zona, y la entrega igual a cada
lenguaje. El peso total es muy inferior a 20 MB; el valor esta en los datos, no
en binarios.

## Paquetes

| Lenguaje   | Ruta                   |
|------------|------------------------|
| TypeScript | `packages/typescript`  |
| Python     | `packages/python`      |
| Dart       | `packages/dart`        |
| Go         | `packages/go`          |
| Java       | `packages/java`        |
| Rust       | `packages/rust`        |
| C          | `packages/c`           |

Todos implementan la misma API ([SPEC.md](SPEC.md)) y se verifican contra los
mismos vectores golden.

## Funcionalidades

1. **Ubigeos** - `getRegion`, `getProvince`, `getDistrict`, `isValidUbigeo`,
   `searchDistricts`, `parentOf` sobre el dataset INEI completo (25 / 196 / 1893).
2. **Coordenadas** - `toUTM`, `toWGS84`, `utmZoneFor` para zonas UTM 17S/18S/19S
   sobre el datum WGS84 (explicito, no asumido).
3. **Areas** - `toHectares`, `toKm2`, `formatArea`.
4. **Distancia** - `distance` (haversine, kilometros).
5. **Bounding box** - `boundingBox` sobre cualquier geometria GeoJSON.
6. **Territorial** - `recommendationFor`, `generateRecommendations`,
   `classifyHazard`, `riskLevelToScore`, `calculateTerritorialRisk`,
   `generateTerritorialSummary` (heuristicas documentadas, solo referencia).

## Vistazo rapido

```ts
getRegion("24")          // -> { code:"24", name:"Tumbes", ... }
getDistrict("240203")    // -> { name:"Canoas de Punta Sal", ... }
isValidUbigeo("240203")  // -> true

toUTM(-3.683, -80.451)
// -> { zone:17, hemisphere:"S", epsg:32717, easting:560966, northing:9592893 }

formatArea(467443.66)    // -> "467,443.66 m² (46.74 ha)"
distance([-80.451,-3.683], [-80.320,-3.561])  // -> 19.8839 (km)
```

## Datos

Los datasets canonicos viven en `data/` y los consume cada paquete:

- `data/ubigeo/{departments,provinces,districts}.json`
- `data/crs/utm-zones.json`
- `data/territorial/{recommendations,hazard-keywords}.json`

## Nota de precision

La conversion de coordenadas usa la serie estandar de Transverse Mercator sobre
WGS84 y hace round-trip con precision sub-metrica. El puntaje de riesgo
territorial y las recomendaciones son heuristicas y no reemplazan la opinion
tecnica de las autoridades competentes (SERNANP, INGEMMET, SUNARP, SERFOR,
MIDAGRI).

## Licencia y atribucion

MIT - ver [LICENSE](LICENSE).

El dataset de ubigeos (`data/ubigeo/*`) usa los codigos y nombres oficiales de
ubigeo del INEI, datos administrativos publicos del Peru. Las reglas
territoriales y heuristicas de riesgo son solo referencia y no reemplazan la
opinion tecnica de las autoridades competentes (SERNANP, INGEMMET, SUNARP,
SERFOR, MIDAGRI).

Ejecuta `node scripts/update-year.mjs` para estampar el anio actual abajo.

<!-- year:start -->2026<!-- year:end --> Jhafet Canepa Maceda
