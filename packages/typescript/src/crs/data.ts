import utmZones from "../../data/crs/utm-zones.json";

interface ZoneDef {
  zone: number;
  hemisphere: string;
  epsg: number;
  centralMeridian: number;
  lngMin: number;
  lngMax: number;
}

interface UtmZonesData {
  datum: string;
  ellipsoid: {
    a: number;
    f: number;
    k0: number;
    falseEasting: number;
    falseNorthingSouth: number;
  };
  zones: ZoneDef[];
}

export const utmData = utmZones as UtmZonesData;

export const zoneByNumber = new Map(utmData.zones.map((z) => [z.zone, z]));
