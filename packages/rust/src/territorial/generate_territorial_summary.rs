use super::types::Intersection;

pub fn generate_territorial_summary(intersections: &[Intersection]) -> String {
    if intersections.is_empty() {
        return "El territorio no presenta superposiciones con las capas evaluadas.".to_string();
    }

    let dominant = if intersections.iter().any(|i| i.level == "ALTO") {
        "ALTO"
    } else if intersections.iter().any(|i| i.level == "MEDIO") {
        "MEDIO"
    } else {
        "BAJO"
    };

    let entities: Vec<&str> = intersections.iter().map(|i| i.entity.as_str()).collect();

    format!(
        "El territorio presenta superposicion de nivel {} con {} entidad(es): {}.",
        dominant,
        intersections.len(),
        entities.join(", ")
    )
}
