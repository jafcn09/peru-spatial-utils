use super::to_hectares::to_hectares;

pub fn format_area(m2: f64) -> String {
    format!(
        "{} m\u{00B2} ({} ha)",
        format_number(m2),
        format_number(to_hectares(m2))
    )
}

fn format_number(value: f64) -> String {
    let negative = value < 0.0;
    let rounded = (value.abs() * 100.0).round() / 100.0;
    let cents = (rounded * 100.0).round() as u64;
    let int_part = cents / 100;
    let frac_part = cents % 100;

    let mut sign = String::new();
    if negative && cents != 0 {
        sign.push('-');
    }

    format!(
        "{}{}.{:02}",
        sign,
        group_thousands(int_part),
        frac_part
    )
}

fn group_thousands(n: u64) -> String {
    let digits = n.to_string();
    let bytes = digits.as_bytes();
    let mut out = String::new();
    let len = bytes.len();
    for (i, b) in bytes.iter().enumerate() {
        if i > 0 && (len - i) % 3 == 0 {
            out.push(',');
        }
        out.push(*b as char);
    }
    out
}
