/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// （版本一）左闭右闭区间

var search1 = function(nums, target) {
  let l = 0, r = nums.length - 1;
  // 区间 [l, r]
  while(l <= r) {
      let mid = (l + r) >> 1;

      if(nums[mid] === target) return mid;

      let isSmall = nums[mid] < target;
      l = isSmall ? mid + 1 : l;
      r = isSmall ? r : mid - 1;
  }
  return -1;
};

// （版本二）左闭右开区间

var search2 = function(nums, target) {
  let l = 0, r = nums.length;
  // 区间 [l, r）
  while(l < r) {
      let mid = (l + r) >> 1;
      if(nums[mid] === target) return mid;

      let isSmall = nums[mid] < target;
      l = isSmall ? mid + 1 : l;
      // 所以 mid 不会被取到
      r = isSmall ? r : mid;
  }
  return -1;
};
var nums = [-1,0,3,5,9,12]

var target = 9

search1(nums, target)