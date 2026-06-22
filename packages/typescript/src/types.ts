export interface UbigeoRecord {
  code: string;
  name: string;
  capital: string;
  lat: number;
  lng: number;
}

export type Position = [number, number];

export interface UtmResult {
  zone: number;
  hemisphere: "S";
  epsg: number;
  easting: number;
  northing: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export type RiskLevel = "BAJO" | "MEDIO" | "ALTO";

export interface Intersection {
  entity?: string;
  level: RiskLevel;
}

export interface TerritorialRisk {
  risk: RiskLevel;
  score: number;
}
