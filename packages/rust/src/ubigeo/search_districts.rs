use super::record::UbigeoRecord;
use crate::data::ubigeo::DISTRICTS;

pub fn search_districts(query: &str, limit: usize) -> Vec<UbigeoRecord> {
    let q = normalize(query);
    if q.is_empty() {
        return Vec::new();
    }

    let mut scored: Vec<(u8, usize, &crate::data::ubigeo::Row)> = Vec::new();
    for (idx, row) in DISTRICTS.iter().enumerate() {
        let name = normalize(row.1);
        if let Some(rank) = rank_match(&name, &q) {
            scored.push((rank, idx, row));
        }
    }

    scored.sort_by(|a, b| a.0.cmp(&b.0).then(a.1.cmp(&b.1)));
    scored
        .into_iter()
        .take(limit)
        .map(|(_, _, row)| UbigeoRecord::from_row(row))
        .collect()
}

fn rank_match(name: &str, q: &str) -> Option<u8> {
    if name == q {
        return Some(0);
    }
    if name.starts_with(q) {
        return Some(1);
    }
    if is_word_start(name, q) {
        return Some(2);
    }
    if name.contains(q) {
        return Some(3);
    }
    None
}

fn is_word_start(name: &str, q: &str) -> bool {
    name.split(|c: char| c == ' ' || c == '-')
        .any(|word| word.starts_with(q))
}

pub(crate) fn normalize(input: &str) -> String {
    input
        .trim()
        .chars()
        .map(strip_accent)
        .collect::<String>()
        .to_lowercase()
}

fn strip_accent(c: char) -> char {
    match c {
        'á' | 'à' | 'ä' | 'â' | 'ã' | 'Á' | 'À' | 'Ä' | 'Â' | 'Ã' => 'a',
        'é' | 'è' | 'ë' | 'ê' | 'É' | 'È' | 'Ë' | 'Ê' => 'e',
        'í' | 'ì' | 'ï' | 'î' | 'Í' | 'Ì' | 'Ï' | 'Î' => 'i',
        'ó' | 'ò' | 'ö' | 'ô' | 'õ' | 'Ó' | 'Ò' | 'Ö' | 'Ô' | 'Õ' => 'o',
        'ú' | 'ù' | 'ü' | 'û' | 'Ú' | 'Ù' | 'Ü' | 'Û' => 'u',
        'ñ' | 'Ñ' => 'n',
        'ç' | 'Ç' => 'c',
        other => other,
    }
}
