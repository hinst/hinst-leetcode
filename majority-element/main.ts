function majorityElement(numbers: number[]): number {
	const countMap = new Map<number, number>();
	for (const item of numbers) {
		const count = countMap.get(item) || 0;
		countMap.set(item, count + 1);
	}
	let maxCount = 0;
	let bestValue = 0;
	for (const item of countMap) {
		const value = item[0];
		const count = item[1];
		if (maxCount < count) {
			maxCount = count;
			bestValue = value;
		}
	}
	return bestValue;
}

if (import.meta.main) {
	console.log(majorityElement([3, 2, 3]));
}
