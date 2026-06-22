use crate::data::territorial::{ENTITIES, FALLBACK};

pub fn recommendation_for(entity: &str) -> String {
    for (key, value) in ENTITIES {
        if *key == entity {
            return value.to_string();
        }
    }
    FALLBACK.replace("{entity}", entity)
}
