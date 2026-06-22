use super::types::{Intersection, TerritorialRisk};

pub fn calculate_territorial_risk(intersections: &[Intersection]) -> TerritorialRisk {
    let sum: i32 = intersections.iter().map(|i| weight(&i.level)).sum();
    let score = sum.min(100);
    let risk = if score >= 67 {
        "ALTO"
    } else if score >= 34 {
        "MEDIO"
    } else {
        "BAJO"
    };
    TerritorialRisk {
        risk: risk.to_string(),
        score,
    }
}

fn weight(level: &str) -> i32 {
    match level {
        "BAJO" => 10,
        "MEDIO" => 20,
        "ALTO" => 34,
        _ => 0,
    }
}
