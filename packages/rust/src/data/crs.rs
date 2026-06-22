pub struct Zone {
    pub zone: i32,
    pub hemisphere: &'static str,
    pub epsg: i32,
    pub central_meridian: f64,
    pub lng_min: f64,
    pub lng_max: f64,
}

pub const A: f64 = 6378137.0;
pub const F: f64 = 0.0033528106647474805;
pub const K0: f64 = 0.9996;
pub const FALSE_EASTING: f64 = 500000.0;
pub const FALSE_NORTHING_SOUTH: f64 = 10000000.0;

pub static ZONES: &[Zone] = &[
    Zone { zone: 17, hemisphere: "S", epsg: 32717, central_meridian: -81.0, lng_min: -84.0, lng_max: -78.0 },
    Zone { zone: 18, hemisphere: "S", epsg: 32718, central_meridian: -75.0, lng_min: -78.0, lng_max: -72.0 },
    Zone { zone: 19, hemisphere: "S", epsg: 32719, central_meridian: -69.0, lng_min: -72.0, lng_max: -66.0 },
];
