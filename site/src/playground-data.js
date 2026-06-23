export const PG_LANGS = [
  ['ts', 'TypeScript'],
  ['python', 'Python'],
  ['dart', 'Dart'],
  ['go', 'Go'],
  ['java', 'Java'],
  ['rust', 'Rust'],
  ['c', 'C'],
];

export const PG_FUNCS = ['getDistrict', 'toUTM', 'distance', 'formatArea', 'isValidUbigeo'];

export const PG_SNIPPETS = {
  getDistrict: {
    ts: `import { getDistrict } from "@coderesolutions/peru-spatial-utils";\n\ngetDistrict("240203").name;\n// "Canoas de Punta Sal"`,
    python: `from peru_spatial_utils import get_district\n\nget_district("240203").name\n# "Canoas de Punta Sal"`,
    dart: `import 'package:peru_spatial_utils/peru_spatial_utils.dart';\n\ngetDistrict('240203')!.name;\n// 'Canoas de Punta Sal'`,
    go: `import psu "github.com/jafcn09/peru-spatial-utils/go"\n\npsu.GetDistrict("240203").Name\n// "Canoas de Punta Sal"`,
    java: `import com.peruspatial.ubigeo.GetDistrict;\n\nGetDistrict.getDistrict("240203").name();\n// "Canoas de Punta Sal"`,
    rust: `use peru_spatial_utils::get_district;\n\nget_district("240203").unwrap().name;\n// "Canoas de Punta Sal"`,
    c: `#include "psu.h"\n\nPsuUbigeo d = psu_get_district("240203");\nprintf("%s", d.name); /* Canoas de Punta Sal */`,
  },
  toUTM: {
    ts: `import { toUTM } from "@coderesolutions/peru-spatial-utils";\n\ntoUTM(-3.683, -80.451);\n// { zone: 17, easting: 560966, northing: 9592893 }`,
    python: `from peru_spatial_utils import to_utm\n\nto_utm(-3.683, -80.451)\n# { 'zone': 17, 'easting': 560966, 'northing': 9592893 }`,
    dart: `import 'package:peru_spatial_utils/peru_spatial_utils.dart';\n\ntoUTM(-3.683, -80.451);\n// zone 17, easting 560966, northing 9592893`,
    go: `import psu "github.com/jafcn09/peru-spatial-utils/go"\n\npsu.ToUTM(-3.683, -80.451)\n// {Zone:17 Easting:560966 Northing:9592893}`,
    java: `import com.peruspatial.crs.ToUTM;\n\nToUTM.toUTM(-3.683, -80.451);\n// zone 17, 560966E 9592893N`,
    rust: `use peru_spatial_utils::to_utm;\n\nto_utm(-3.683, -80.451);\n// zone 17, 560966, 9592893`,
    c: `#include "psu.h"\n\nPsuUtm u = psu_to_utm(-3.683, -80.451);\n/* zone 17, easting 560966, northing 9592893 */`,
  },
  distance: {
    ts: `import { distance } from "@coderesolutions/peru-spatial-utils";\n\ndistance([-80.451, -3.683], [-80.320, -3.561]);\n// 19.8839 (km)`,
    python: `from peru_spatial_utils import distance\n\ndistance([-80.451, -3.683], [-80.320, -3.561])\n# 19.8839`,
    dart: `import 'package:peru_spatial_utils/peru_spatial_utils.dart';\n\ndistance([-80.451, -3.683], [-80.320, -3.561]);\n// 19.8839`,
    go: `import psu "github.com/jafcn09/peru-spatial-utils/go"\n\npsu.Distance([2]float64{-80.451, -3.683}, [2]float64{-80.320, -3.561})\n// 19.8839`,
    java: `import com.peruspatial.distance.Distance;\n\nDistance.distance(new double[]{-80.451, -3.683}, new double[]{-80.320, -3.561});\n// 19.8839`,
    rust: `use peru_spatial_utils::distance;\n\ndistance([-80.451, -3.683], [-80.320, -3.561]);\n// 19.8839`,
    c: `#include "psu.h"\n\ndouble a[2] = {-80.451, -3.683}, b[2] = {-80.320, -3.561};\npsu_distance(a, b); /* 19.8839 */`,
  },
  formatArea: {
    ts: `import { formatArea } from "@coderesolutions/peru-spatial-utils";\n\nformatArea(467443.66);\n// "467,443.66 m² (46.74 ha)"`,
    python: `from peru_spatial_utils import format_area\n\nformat_area(467443.66)\n# "467,443.66 m² (46.74 ha)"`,
    dart: `import 'package:peru_spatial_utils/peru_spatial_utils.dart';\n\nformatArea(467443.66);\n// "467,443.66 m² (46.74 ha)"`,
    go: `import psu "github.com/jafcn09/peru-spatial-utils/go"\n\npsu.FormatArea(467443.66)\n// "467,443.66 m² (46.74 ha)"`,
    java: `import com.peruspatial.area.FormatArea;\n\nFormatArea.formatArea(467443.66);\n// "467,443.66 m² (46.74 ha)"`,
    rust: `use peru_spatial_utils::format_area;\n\nformat_area(467443.66);\n// "467,443.66 m² (46.74 ha)"`,
    c: `#include "psu.h"\n\nchar buf[64];\npsu_format_area(467443.66, buf, sizeof buf);\n/* "467,443.66 m² (46.74 ha)" */`,
  },
  isValidUbigeo: {
    ts: `import { isValidUbigeo } from "@coderesolutions/peru-spatial-utils";\n\nisValidUbigeo("240203"); // true\nisValidUbigeo("999999"); // false`,
    python: `from peru_spatial_utils import is_valid_ubigeo\n\nis_valid_ubigeo("240203")  # True\nis_valid_ubigeo("999999")  # False`,
    dart: `import 'package:peru_spatial_utils/peru_spatial_utils.dart';\n\nisValidUbigeo('240203'); // true\nisValidUbigeo('999999'); // false`,
    go: `import psu "github.com/jafcn09/peru-spatial-utils/go"\n\npsu.IsValidUbigeo("240203") // true\npsu.IsValidUbigeo("999999") // false`,
    java: `import com.peruspatial.ubigeo.IsValidUbigeo;\n\nIsValidUbigeo.isValidUbigeo("240203"); // true\nIsValidUbigeo.isValidUbigeo("999999"); // false`,
    rust: `use peru_spatial_utils::is_valid_ubigeo;\n\nis_valid_ubigeo("240203"); // true\nis_valid_ubigeo("999999"); // false`,
    c: `#include "psu.h"\n\npsu_is_valid_ubigeo("240203"); /* 1 */\npsu_is_valid_ubigeo("999999"); /* 0 */`,
  },
};
