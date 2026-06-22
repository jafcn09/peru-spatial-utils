import { departmentByCode, provinceByCode, districtByCode } from "./data";

export function isValidUbigeo(code: string): boolean {
  if (!/^\d+$/.test(code)) {
    return false;
  }
  if (code.length === 2) {
    return departmentByCode.has(code);
  }
  if (code.length === 4) {
    return provinceByCode.has(code);
  }
  if (code.length === 6) {
    return districtByCode.has(code);
  }
  return false;
}
