import { districtByCode } from "./data";
import type { UbigeoRecord } from "../types";

export function getDistrict(code: string): UbigeoRecord | null {
  return districtByCode.get(code) ?? null;
}
