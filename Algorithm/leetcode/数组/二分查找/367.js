/**
 * @param {number} num
 * @return {boolean}
 */
 var isPerfectSquare = function(num) {
	 if (num < 2) return true

	 let l = 0
	 let r = num
	 let ans = false

	 while (l < r) {
		 const mid = l + r >> 1

		 if (mid * mid < num) {
			 l = mid + 1
		 } else if (mid * mid > num) {
			 r = mid
		 } else {
			 return true
		 }
	 }

	 return ans
};


console.log(isPerfectSquare(14));
