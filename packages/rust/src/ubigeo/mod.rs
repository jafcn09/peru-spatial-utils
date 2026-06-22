mod record;
mod get_department;
mod get_province;
mod get_district;
mod is_valid_ubigeo;
mod search_districts;
mod parent_of;

pub use record::UbigeoRecord;
pub use get_department::{get_department, get_region};
pub use get_province::get_province;
pub use get_district::get_district;
pub use is_valid_ubigeo::is_valid_ubigeo;
pub use search_districts::search_districts;
pub use parent_of::parent_of;
