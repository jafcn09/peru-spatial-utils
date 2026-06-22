use crate::data::crs::ZONES;

pub fn utm_zone_for(lng: f64) -> i32 {
    for z in ZONES {
        if lng >= z.lng_min && lng < z.lng_max {
            return z.zone;
        }
    }
    (((lng + 180.0) / 6.0).floor() as i32) + 1
}
