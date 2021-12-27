/**
 * @param {number[]} fruits
 * @return {number}
 */
 var totalFruit = function(fruits) {
	if (fruits.length < 3) return fruits.length

	let L = 0
	let ans = 0
	let b = []
	let kind = 0
	let twoFruitsVal = []

	for (let R = 0; R < fruits.length; R++) {``
		b.push(fruits[R])
		
		if (!twoFruitsVal.length) {
			twoFruitsVal.push(fruits[R])
			kind++
		}else if (twoFruitsVal.length === 1 && twoFruitsVal[0] !== fruits[R]) {
			twoFruitsVal.push(fruits[R])
			kind++
		} else if (twoFruitsVal.length === 2 && twoFruitsVal[0] !== fruits[R] && twoFruitsVal[1] !== fruits[R]) {
			kind++
		}

		if (kind < 3) {
			ans = ans >= R - L + 1 ? ans : R - L + 1
		}

		if (kind > 2) {
			L = R - 1
			while (b[L] === b[L-1] && L > 0) {
				L--
			}
			kind -= 1
			twoFruitsVal = [b[R-1], b[R]]
		}
	}

	return ans
};
