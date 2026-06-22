package perspatial

import (
	"strconv"
	"strings"
)

func FormatArea(m2 float64) string {
	return thousands(m2) + " m² (" + twoDecimals(ToHectares(m2)) + " ha)"
}

func twoDecimals(v float64) string {
	return strconv.FormatFloat(v, 'f', 2, 64)
}

func thousands(v float64) string {
	s := strconv.FormatFloat(v, 'f', 2, 64)
	neg := strings.HasPrefix(s, "-")
	if neg {
		s = s[1:]
	}
	intPart, frac := s, ""
	if dot := strings.IndexByte(s, '.'); dot >= 0 {
		intPart = s[:dot]
		frac = s[dot:]
	}
	var b strings.Builder
	n := len(intPart)
	for i, c := range intPart {
		if i > 0 && (n-i)%3 == 0 {
			b.WriteByte(',')
		}
		b.WriteRune(c)
	}
	res := b.String() + frac
	if neg {
		res = "-" + res
	}
	return res
}
