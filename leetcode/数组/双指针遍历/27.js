var removeElement = (nums, val) => {
  let k = 0;
  for(let i = 0;i < nums.length;i++){
    console.log(`i: ${i}, k: ${k}`);
    if(nums[i] !== val){
        nums[k++] = nums[i]
    }
  }
  console.log(nums);
  return k;
};

console.log(removeElement([3,2,2,3], 3));