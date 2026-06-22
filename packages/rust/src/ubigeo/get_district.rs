use super::record::{find, UbigeoRecord};
use crate::data::ubigeo::DISTRICTS;

pub fn get_district(code: &str) -> Option<UbigeoRecord> {
    find(DISTRICTS, code)
}
