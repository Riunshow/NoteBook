const minWindow = (s, t) => {
  let minLen = s.length + 1
  let start = s.length
  let map = {}
  let missingType = 0

  for (const c of t) {
    if (!map[c]) {
      missingType++
      map[c] = 1
    } else {
      map[c]++
    }
  }

  let l = 0;

  for (r = 0; r < s.length; r++) {
    let rightChar = s[r]

    if (map[rightChar] !== undefined) map[rightChar]--
    if (map[rightChar] == 0) missingType--

    while (missingType == 0) {
      if (r - l + 1 < minLen) {
        minLen = r - l + 1
        start = l
      }
      let leftChar = s[l]

      if (map[leftChar] !== undefined) map[leftChar]++
      if (map[leftChar] > 0) missingType++

      l++
    }
  }

  if (start == s.length) return ''

  return s.substring(start, start + minLen)
};