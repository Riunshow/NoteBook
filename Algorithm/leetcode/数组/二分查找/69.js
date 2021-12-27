/**
 * @param {number} x
 * @return {number}
 */
 var mySqrt = function(x) {
	if (x < 2) return x

	let l = 0
	let r = x
	let ans = -1

	while(l < r) {
			const mid = l + r >> 1

			if(mid * mid <= x) {
					ans = mid
					l = mid + 1
			} else {
					r = mid
			}
	}

	return ans
};