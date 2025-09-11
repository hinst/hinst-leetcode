function findMin(nums: number[], beginning = 0, ending = nums.length - 1): number {
    if (beginning === ending)
		return nums[beginning];
	const middle = Math.floor((beginning + ending) / 2);
	if (nums[beginning] < nums[middle])
		return findMin(nums, middle, ending);
	else
		return findMin(nums, beginning, middle);
}

if (import.meta.main) {
	console.log(findMin([3,4,5,1,2]));
}
