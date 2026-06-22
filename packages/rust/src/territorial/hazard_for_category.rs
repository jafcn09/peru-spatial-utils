use crate::data::territorial::{CATEGORY_FALLBACK, HAZARD_DEFAULT};

pub fn hazard_for_category(category: &str) -> String {
    for (key, value) in CATEGORY_FALLBACK {
        if *key == category {
            return value.to_string();
        }
    }
    HAZARD_DEFAULT.to_string()
}
