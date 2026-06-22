package perspatial

func GetDistrict(code string) *UbigeoRecord {
	if r, ok := districtsByCode[code]; ok {
		return &r
	}
	return nil
}
