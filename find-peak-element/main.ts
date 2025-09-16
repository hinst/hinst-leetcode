function findPeakElement(nums: number[]): number {
    for (let i = 0; i < nums.length; ++i) {
		if ((nums[i - 1] < nums[i] || nums[i - 1] === undefined) && (nums[i] > nums[i + 1]) || nums[i + 1] === undefined)
			return i;
	}
	return -1;
}

if (import.meta.main) {
}
