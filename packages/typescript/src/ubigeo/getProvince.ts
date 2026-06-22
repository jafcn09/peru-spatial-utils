import { provinceByCode } from "./data";
import type { UbigeoRecord } from "../types";

export function getProvince(code: string): UbigeoRecord | null {
  return provinceByCode.get(code) ?? null;
}
