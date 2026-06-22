use crate::data::territorial::{HAZARD_DEFAULT, RULES};

pub fn classify_hazard(text: &str) -> String {
    let lower = text.to_lowercase();
    for (hazard, keywords) in RULES {
        if keywords.iter().any(|k| lower.contains(k)) {
            return hazard.to_string();
        }
    }
    HAZARD_DEFAULT.to_string()
}
