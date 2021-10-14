/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  let l = 0
  let r = nums.length - 1
  let res = []

  for (let k = nums.length - 1; k >= 0; k--) {
    if (nums[l] * nums[l] < nums[r] * nums[r]) {
      res[k] = nums[r] * nums[r]
      r--
    } else {
      res[k] = nums[l] * nums[l]
      l++
    }
    console.log(l, r, res);
  }

  return res
};

sortedSquares([-4,-1,0,3,10])