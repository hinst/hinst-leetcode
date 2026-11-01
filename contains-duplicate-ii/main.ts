function containsNearbyDuplicate(nums: number[], k: number): boolean {
	const map = new Map<number, number[]>();
	let index = 0;
	for (const item of nums) {
		const indexes = map.get(item) || [];
		indexes.push(index);
		map.set(item, indexes);

		for (const otherIndex of indexes) {
			if (otherIndex === index)
				continue;
			if (Math.abs(otherIndex - index) <= k)
				return true;
		}
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
