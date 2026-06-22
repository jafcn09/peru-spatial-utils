use super::record::{find, UbigeoRecord};
use crate::data::ubigeo::DEPARTMENTS;

pub fn get_department(code: &str) -> Option<UbigeoRecord> {
    find(DEPARTMENTS, code)
}

pub fn get_region(code: &str) -> Option<UbigeoRecord> {
    get_department(code)
}
