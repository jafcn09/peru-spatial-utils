use super::get_department::get_department;
use super::get_district::get_district;
use super::get_province::get_province;

pub fn is_valid_ubigeo(code: &str) -> bool {
    if !code.bytes().all(|b| b.is_ascii_digit()) {
        return false;
    }
    match code.len() {
        2 => get_department(code).is_some(),
        4 => get_province(code).is_some(),
        6 => get_district(code).is_some(),
        _ => false,
    }
}
