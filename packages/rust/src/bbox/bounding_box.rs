use super::geojson::{BoundingBox, GeoJson};

pub fn bounding_box(geojson: &GeoJson) -> BoundingBox {
    let mut min_x = f64::INFINITY;
    let mut min_y = f64::INFINITY;
    let mut max_x = f64::NEG_INFINITY;
    let mut max_y = f64::NEG_INFINITY;

    geojson.for_each_coord(&mut |[x, y]| {
        if x < min_x {
            min_x = x;
        }
        if y < min_y {
            min_y = y;
        }
        if x > max_x {
            max_x = x;
        }
        if y > max_y {
            max_y = y;
        }
    });

    BoundingBox {
        min_x,
        min_y,
        max_x,
        max_y,
    }
}
