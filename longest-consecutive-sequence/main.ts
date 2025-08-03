const map: Map<number, {count: number}> = new Map();

function longestConsecutive(numbers: number[]): number {
	map.clear();
	let max = 0;
	for (const value of numbers) {
		let item = map.get(value);
		if (!item) {
			item = {count: 1};
			map.set(value, item);
		} else {
			++item.count;
		}

		const left = map.get(value - 1);
		if (left) {
			item.count += left.count;
			map.set(value - 1, item);
		}
		const right = map.get(value + 1);
		if (right) {
			item.count += right.count;
			map.set(value + 1, item);
		}

		if (max < item.count)
			max = item.count;
	}
	return max;
}

if (import.meta.main) {
	const nums = [100,4,200,1,3,2];
	console.log(longestConsecutive(nums));
}
