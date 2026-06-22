#[derive(Debug, Clone, PartialEq)]
pub struct BoundingBox {
    pub min_x: f64,
    pub min_y: f64,
    pub max_x: f64,
    pub max_y: f64,
}

#[derive(Debug, Clone, PartialEq)]
pub enum GeoJson {
    Point([f64; 2]),
    MultiPoint(Vec<[f64; 2]>),
    LineString(Vec<[f64; 2]>),
    MultiLineString(Vec<Vec<[f64; 2]>>),
    Polygon(Vec<Vec<[f64; 2]>>),
    MultiPolygon(Vec<Vec<Vec<[f64; 2]>>>),
    GeometryCollection(Vec<GeoJson>),
    Feature(Box<GeoJson>),
    FeatureCollection(Vec<GeoJson>),
}

impl GeoJson {
    pub(crate) fn for_each_coord<F: FnMut([f64; 2])>(&self, f: &mut F) {
        match self {
            GeoJson::Point(c) => f(*c),
            GeoJson::MultiPoint(cs) | GeoJson::LineString(cs) => {
                for c in cs {
                    f(*c);
                }
            }
            GeoJson::MultiLineString(rings) | GeoJson::Polygon(rings) => {
                for ring in rings {
                    for c in ring {
                        f(*c);
                    }
                }
            }
            GeoJson::MultiPolygon(polys) => {
                for poly in polys {
                    for ring in poly {
                        for c in ring {
                            f(*c);
                        }
                    }
                }
            }
            GeoJson::GeometryCollection(items) | GeoJson::FeatureCollection(items) => {
                for item in items {
                    item.for_each_coord(f);
                }
            }
            GeoJson::Feature(geom) => geom.for_each_coord(f),
        }
    }
}
