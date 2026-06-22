package perspatial

func IsValidUbigeo(code string) bool {
	if !isDigits(code) {
		return false
	}
	switch len(code) {
	case 2:
		_, ok := departmentsByCode[code]
		return ok
	case 4:
		_, ok := provincesByCode[code]
		return ok
	case 6:
		_, ok := districtsByCode[code]
		return ok
	default:
		return false
	}
}

func isDigits(s string) bool {
	if s == "" {
		return false
	}
	for _, c := range s {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}
