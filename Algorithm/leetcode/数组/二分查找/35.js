/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = function(nums, target) {
  let l = 0
  let r = nums.length - 1
  let site = nums.length

  if(nums.legnth === 0) return 0

  if(target > nums[r]) return site

  while(l <= r) {
      const mid = l + r >> 1

      if (nums[mid] < target) {
          l = mid + 1
      } else {
          site = mid
          r = mid - 1
      }
  }

  return site
};