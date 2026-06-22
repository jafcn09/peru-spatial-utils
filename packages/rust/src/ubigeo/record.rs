use crate::data::ubigeo::Row;

#[derive(Debug, Clone, PartialEq)]
pub struct UbigeoRecord {
    pub code: String,
    pub name: String,
    pub capital: String,
    pub lat: Option<f64>,
    pub lng: Option<f64>,
}

impl UbigeoRecord {
    pub(crate) fn from_row(row: &Row) -> Self {
        UbigeoRecord {
            code: row.0.to_string(),
            name: row.1.to_string(),
            capital: row.2.to_string(),
            lat: row.3,
            lng: row.4,
        }
    }
}

pub(crate) fn find(rows: &[Row], code: &str) -> Option<UbigeoRecord> {
    rows.iter()
        .find(|r| r.0 == code)
        .map(UbigeoRecord::from_row)
}
