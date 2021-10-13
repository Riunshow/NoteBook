/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  const res = [-1, -1]
  if (nums.length === 0) return res

  let l = 0
  let r = nums.length - 1

  while (l < r) {
    const mid = l + r >> 1

    if (nums[mid] < target) {
      l = mid + 1
    } else {
      r = mid
    }
  }

  if (nums[l] !== target) return res

  res[0] = l

  r = nums.length

  console.log(`l: ${l}, r: ${r}`);

  while (l < r) {
    const mid = l + r >> 1

    if (nums[mid] <= target) {
      l = mid + 1
    } else {
      r = mid
    }

    console.log(`l: ${l}, r: ${r}, mid: ${mid}`);
  }

  res[1] = l - 1

  return res
}

var list = [5,7,7,8,8,10]
console.log(searchRange(list, 10));