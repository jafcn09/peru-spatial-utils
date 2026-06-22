const EARTH_RADIUS_KM: f64 = 6371.0088;

pub fn distance(a: [f64; 2], b: [f64; 2]) -> f64 {
    let lat1 = a[1].to_radians();
    let lat2 = b[1].to_radians();
    let dlat = (b[1] - a[1]).to_radians();
    let dlng = (b[0] - a[0]).to_radians();

    let h = (dlat / 2.0).sin().powi(2)
        + lat1.cos() * lat2.cos() * (dlng / 2.0).sin().powi(2);

    2.0 * EARTH_RADIUS_KM * h.sqrt().asin()
}
