package perspatial

import (
	"sort"
	"strings"
)

func SearchDistricts(query string, limit int) []UbigeoRecord {
	if limit <= 0 {
		limit = 10
	}
	q := normalize(query)
	if q == "" {
		return []UbigeoRecord{}
	}

	type scored struct {
		rec   UbigeoRecord
		rank  int
		index int
	}
	var matches []scored
	for i, d := range districts {
		name := normalize(d.Name)
		rank := matchRank(name, q)
		if rank < 0 {
			continue
		}
		matches = append(matches, scored{rec: d, rank: rank, index: i})
	}

	sort.SliceStable(matches, func(a, b int) bool {
		if matches[a].rank != matches[b].rank {
			return matches[a].rank < matches[b].rank
		}
		return matches[a].index < matches[b].index
	})

	if len(matches) > limit {
		matches = matches[:limit]
	}
	out := make([]UbigeoRecord, len(matches))
	for i, m := range matches {
		out[i] = m.rec
	}
	return out
}

func matchRank(name, q string) int {
	switch {
	case name == q:
		return 0
	case strings.HasPrefix(name, q):
		return 1
	case wordStart(name, q):
		return 2
	case strings.Contains(name, q):
		return 3
	default:
		return -1
	}
}

func wordStart(name, q string) bool {
	for _, word := range strings.Fields(name) {
		if strings.HasPrefix(word, q) {
			return true
		}
	}
	return false
}
