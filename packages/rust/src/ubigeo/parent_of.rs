pub fn parent_of(code: &str) -> Option<String> {
    match code.len() {
        6 => Some(code[..4].to_string()),
        4 => Some(code[..2].to_string()),
        _ => None,
    }
}
