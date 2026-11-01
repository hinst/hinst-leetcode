function containsNearbyAlmostDuplicate(nums: number[], indexDiff: number, valueDiff: number): boolean {
	for (let i = 0; i < nums.length; ++i) {
		const item = nums[i] || 0;
		for (let j = i - indexDiff; j <= i + indexDiff; ++j) {
			if (i === j)
				continue;
			const otherItem = nums[j];
			if (otherItem != null && Math.abs(otherItem - item) <= valueDiff)
				return true;
		}
	}
	return false;
}


///---

let nums = [1,2,3,1], indexDiff = 3, valueDiff = 0;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
