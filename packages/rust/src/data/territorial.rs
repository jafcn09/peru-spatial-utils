pub static ENTITIES: &[(&str, &str)] = &[
    ("SERNANP", "El territorio se superpone con un Area Natural Protegida. Requiere opinion tecnica previa favorable del SERNANP conforme a la Ley N 26834."),
    ("INGEMMET", "Existe superposicion con derechos mineros. Verificar vigencia y titularidad ante INGEMMET antes de cualquier intervencion."),
    ("SUNARP", "Se identifican predios titulados inscritos en SUNARP. Revisar la situacion registral y posibles derechos de terceros."),
    ("MIDAGRI", "El territorio coincide con comunidades campesinas o nativas. Podria requerir proceso de consulta previa y coordinacion con MIDAGRI."),
    ("SERFOR", "El territorio forma parte del ordenamiento forestal. Verificar restricciones de uso forestal ante SERFOR."),
    ("IGN", "Se identifican centros poblados o rasgos geograficos del IGN en la zona. Considerar en la planificacion territorial."),
];

pub const FALLBACK: &str = "Verificar la normativa aplicable de {entity} antes de cualquier intervencion en el territorio.";

pub static RULES: &[(&str, &[&str])] = &[
    ("tsunami", &["tsunami"]),
    ("earthquake", &["sism", "terremoto"]),
    ("flood", &["inund", "aneg"]),
    ("landslide", &["desliz", "huayco", "derrumbe"]),
    ("volcanic", &["volcan"]),
    ("fire", &["incend"]),
    ("drought", &["sequ"]),
];

pub static CATEGORY_FALLBACK: &[(&str, &str)] = &[
    ("AMBIENTAL", "flood"),
    ("ANTROPICO", "fire"),
    ("BIOLOGICO", "drought"),
    ("INSTITUCIONAL", "landslide"),
];

pub const HAZARD_DEFAULT: &str = "earthquake";
