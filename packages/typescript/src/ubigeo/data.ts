import departments from "../../data/ubigeo/departments.json";
import provinces from "../../data/ubigeo/provinces.json";
import districts from "../../data/ubigeo/districts.json";
import type { UbigeoRecord } from "../types";

export const departmentList = departments as UbigeoRecord[];
export const provinceList = provinces as UbigeoRecord[];
export const districtList = districts as UbigeoRecord[];

export const departmentByCode = new Map(departmentList.map((r) => [r.code, r]));
export const provinceByCode = new Map(provinceList.map((r) => [r.code, r]));
export const districtByCode = new Map(districtList.map((r) => [r.code, r]));
