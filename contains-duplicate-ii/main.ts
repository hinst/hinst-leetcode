function containsNearbyDuplicate(nums: number[], k: number): boolean {
	const map = new Map<number, number>();
	let index = 0;
	for (const item of nums) {
		const latestIndex = map.get(item);
		if (latestIndex != null && Math.abs(latestIndex - index) <= k)
			return true;
		map.set(item, index);
		++index;
	}
	return false;
}


///---

let nums = [1,2,3,1], k = 3;
console.log(containsNearbyDuplicate(nums, k));
nums = [1,0,1,1], k = 1
console.log(containsNearbyDuplicate(nums, k));
nums = [1,2,3,1,2,3], k = 2
console.log(containsNearbyDuplicate(nums, k));
