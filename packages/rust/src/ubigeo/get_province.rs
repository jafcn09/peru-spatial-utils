use super::record::{find, UbigeoRecord};
use crate::data::ubigeo::PROVINCES;

pub fn get_province(code: &str) -> Option<UbigeoRecord> {
    find(PROVINCES, code)
}
