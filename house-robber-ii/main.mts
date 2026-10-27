function rob(nums: number[]): number {
	if (nums.length === 1)
		return nums[0] ?? 0;
	let firstHouseAffected = false;

	function find(i: number): number {
		if (i >= nums.length)
			return 0;
		if (i === nums.length - 1)
			return firstHouseAffected ? 0 : (nums[i] ?? 0);
		const sum0 = find(i + 1);
		const sum1 = (nums[i] ?? 0) + find(i + 2);
		return Math.max(sum0, sum1);
	}

	const sum1 = find(1);
	firstHouseAffected = true;
	const sum2 = find(0);
	return Math.max(sum1, sum2);
}

console.log(rob([2,3,2]));
console.log(rob([1,2,3,1]));
console.log(rob([1,2,3]));
