#[derive(Debug, Clone, PartialEq)]
pub struct Intersection {
    pub entity: String,
    pub level: String,
}

#[derive(Debug, Clone, PartialEq)]
pub struct TerritorialRisk {
    pub risk: String,
    pub score: i32,
}
