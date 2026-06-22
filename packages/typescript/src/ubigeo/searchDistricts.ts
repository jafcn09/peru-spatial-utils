import { districtList } from "./data";
import { normalize } from "./normalize";
import type { UbigeoRecord } from "../types";

function rank(name: string, query: string): number {
  if (name === query) {
    return 0;
  }
  if (name.startsWith(query)) {
    return 1;
  }
  if (name.includes(" " + query)) {
    return 2;
  }
  if (name.includes(query)) {
    return 3;
  }
  return -1;
}

export function searchDistricts(query: string, limit = 10): UbigeoRecord[] {
  const normalized = normalize(query);
  if (normalized.length === 0) {
    return [];
  }
  const scored: { record: UbigeoRecord; score: number; index: number }[] = [];
  districtList.forEach((record, index) => {
    const score = rank(normalize(record.name), normalized);
    if (score >= 0) {
      scored.push({ record, score, index });
    }
  });
  scored.sort((a, b) => a.score - b.score || a.index - b.index);
  return scored.slice(0, limit).map((item) => item.record);
}
