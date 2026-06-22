import { departmentByCode } from "./data";
import type { UbigeoRecord } from "../types";

export function getDepartment(code: string): UbigeoRecord | null {
  return departmentByCode.get(code) ?? null;
}
