#[derive(Debug, Clone, PartialEq)]
pub struct UtmResult {
    pub zone: i32,
    pub hemisphere: String,
    pub epsg: i32,
    pub easting: f64,
    pub northing: f64,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Wgs84 {
    pub lat: f64,
    pub lng: f64,
}
