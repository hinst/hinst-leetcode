function rob(nums: number[]): number {
	if (nums.length === 1)
		return nums[0] ?? 0;
	let firstHouseAffected = false;

	function find(sum: number, i: number): number {
		if (i >= nums.length)
			return sum;
		if (i === nums.length - 1)
			return sum + (firstHouseAffected ? 0 : (nums[i] ?? 0));
		const sum0 = find(sum, i + 1);
		const sum1 = find(sum + (nums[i] ?? 0), i + 2);
		return Math.max(sum0, sum1);
	}

	const sum1 = find(0, 1);
	firstHouseAffected = true;
	const sum2 = find(0, 0);
	return Math.max(sum1, sum2);
}

console.log(rob([2,3,2]));
console.log(rob([1,2,3,1]));
console.log(rob([1,2,3]));
