package perspatial

func ParentOf(code string) *string {
	switch len(code) {
	case 6:
		p := code[:4]
		return &p
	case 4:
		p := code[:2]
		return &p
	default:
		return nil
	}
}
