package perspatial

func GetDepartment(code string) *UbigeoRecord {
	if r, ok := departmentsByCode[code]; ok {
		return &r
	}
	return nil
}

func GetRegion(code string) *UbigeoRecord {
	return GetDepartment(code)
}
