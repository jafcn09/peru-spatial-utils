package perspatial

func GetProvince(code string) *UbigeoRecord {
	if r, ok := provincesByCode[code]; ok {
		return &r
	}
	return nil
}
