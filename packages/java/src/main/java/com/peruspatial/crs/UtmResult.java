package com.peruspatial.crs;

public record UtmResult(int zone, String hemisphere, int epsg, long easting, long northing) {}
