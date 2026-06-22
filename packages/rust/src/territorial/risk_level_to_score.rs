pub fn risk_level_to_score(level: &str) -> i32 {
    match level {
        "BAJO" => 1,
        "MEDIO" => 2,
        "ALTO" => 3,
        _ => 0,
    }
}
