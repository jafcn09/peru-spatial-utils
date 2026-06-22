use super::recommendation_for::recommendation_for;

pub fn generate_recommendations(entities: &[&str]) -> Vec<String> {
    let mut seen: Vec<&str> = Vec::new();
    let mut out: Vec<String> = Vec::new();
    for entity in entities {
        if seen.contains(entity) {
            continue;
        }
        seen.push(entity);
        out.push(recommendation_for(entity));
    }
    out
}
