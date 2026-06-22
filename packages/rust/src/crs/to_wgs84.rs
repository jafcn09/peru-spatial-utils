use super::to_utm::central_meridian_for;
use super::types::Wgs84;
use crate::data::crs::{A, F, FALSE_EASTING, FALSE_NORTHING_SOUTH, K0};

pub fn to_wgs84(easting: f64, northing: f64, zone: i32) -> Wgs84 {
    let e2 = F * (2.0 - F);
    let ep2 = e2 / (1.0 - e2);
    let central_meridian = central_meridian_for(zone);

    let x = easting - FALSE_EASTING;
    let y = northing - FALSE_NORTHING_SOUTH;

    let m = y / K0;
    let mu = m
        / (A * (1.0 - e2 / 4.0 - 3.0 * e2 * e2 / 64.0 - 5.0 * e2 * e2 * e2 / 256.0));

    let e1 = (1.0 - (1.0 - e2).sqrt()) / (1.0 + (1.0 - e2).sqrt());

    let phi1 = mu
        + (3.0 * e1 / 2.0 - 27.0 * e1.powi(3) / 32.0) * (2.0 * mu).sin()
        + (21.0 * e1 * e1 / 16.0 - 55.0 * e1.powi(4) / 32.0) * (4.0 * mu).sin()
        + (151.0 * e1.powi(3) / 96.0) * (6.0 * mu).sin()
        + (1097.0 * e1.powi(4) / 512.0) * (8.0 * mu).sin();

    let sin_phi1 = phi1.sin();
    let cos_phi1 = phi1.cos();
    let tan_phi1 = phi1.tan();

    let n1 = A / (1.0 - e2 * sin_phi1 * sin_phi1).sqrt();
    let t1 = tan_phi1 * tan_phi1;
    let c1 = ep2 * cos_phi1 * cos_phi1;
    let r1 = A * (1.0 - e2) / (1.0 - e2 * sin_phi1 * sin_phi1).powf(1.5);
    let d = x / (n1 * K0);

    let lat = phi1
        - (n1 * tan_phi1 / r1)
            * (d * d / 2.0
                - (5.0 + 3.0 * t1 + 10.0 * c1 - 4.0 * c1 * c1 - 9.0 * ep2) * d.powi(4) / 24.0
                + (61.0 + 90.0 * t1 + 298.0 * c1 + 45.0 * t1 * t1 - 252.0 * ep2 - 3.0 * c1 * c1)
                    * d.powi(6)
                    / 720.0);

    let lng_rad = (d - (1.0 + 2.0 * t1 + c1) * d.powi(3) / 6.0
        + (5.0 - 2.0 * c1 + 28.0 * t1 - 3.0 * c1 * c1 + 8.0 * ep2 + 24.0 * t1 * t1) * d.powi(5)
            / 120.0)
        / cos_phi1;

    Wgs84 {
        lat: lat.to_degrees(),
        lng: central_meridian + lng_rad.to_degrees(),
    }
}
