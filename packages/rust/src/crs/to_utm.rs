use super::types::UtmResult;
use super::utm_zone_for::utm_zone_for;
use crate::data::crs::{A, F, FALSE_EASTING, FALSE_NORTHING_SOUTH, K0, ZONES};

pub fn to_utm(lat: f64, lng: f64) -> UtmResult {
    let zone = utm_zone_for(lng);
    let central_meridian = central_meridian_for(zone);
    let hemisphere = hemisphere_for(zone);

    let e2 = F * (2.0 - F);
    let ep2 = e2 / (1.0 - e2);

    let phi = lat.to_radians();
    let lambda = lng.to_radians();
    let lambda0 = central_meridian.to_radians();

    let sin_phi = phi.sin();
    let cos_phi = phi.cos();
    let tan_phi = phi.tan();

    let n = A / (1.0 - e2 * sin_phi * sin_phi).sqrt();
    let t = tan_phi * tan_phi;
    let c = ep2 * cos_phi * cos_phi;
    let big_a = cos_phi * (lambda - lambda0);

    let m = meridian_arc(phi, e2);

    let easting = FALSE_EASTING
        + K0
            * n
            * (big_a
                + (1.0 - t + c) * big_a.powi(3) / 6.0
                + (5.0 - 18.0 * t + t * t + 72.0 * c - 58.0 * ep2) * big_a.powi(5) / 120.0);

    let northing_raw = K0
        * (m
            + n
                * tan_phi
                * (big_a * big_a / 2.0
                    + (5.0 - t + 9.0 * c + 4.0 * c * c) * big_a.powi(4) / 24.0
                    + (61.0 - 58.0 * t + t * t + 600.0 * c - 330.0 * ep2) * big_a.powi(6) / 720.0));

    let northing = northing_raw + FALSE_NORTHING_SOUTH;

    let epsg = epsg_for(zone);

    UtmResult {
        zone,
        hemisphere: hemisphere.to_string(),
        epsg,
        easting: easting.round(),
        northing: northing.round(),
    }
}

pub(crate) fn meridian_arc(phi: f64, e2: f64) -> f64 {
    A * ((1.0 - e2 / 4.0 - 3.0 * e2 * e2 / 64.0 - 5.0 * e2 * e2 * e2 / 256.0) * phi
        - (3.0 * e2 / 8.0 + 3.0 * e2 * e2 / 32.0 + 45.0 * e2 * e2 * e2 / 1024.0) * (2.0 * phi).sin()
        + (15.0 * e2 * e2 / 256.0 + 45.0 * e2 * e2 * e2 / 1024.0) * (4.0 * phi).sin()
        - (35.0 * e2 * e2 * e2 / 3072.0) * (6.0 * phi).sin())
}

pub(crate) fn central_meridian_for(zone: i32) -> f64 {
    for z in ZONES {
        if z.zone == zone {
            return z.central_meridian;
        }
    }
    ((zone - 1) * 6 - 180 + 3) as f64
}

pub(crate) fn hemisphere_for(zone: i32) -> &'static str {
    for z in ZONES {
        if z.zone == zone {
            return z.hemisphere;
        }
    }
    "S"
}

pub(crate) fn epsg_for(zone: i32) -> i32 {
    for z in ZONES {
        if z.zone == zone {
            return z.epsg;
        }
    }
    32700 + zone
}
