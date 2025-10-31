function twoSum(numbers: number[], target: number): number[] {
	/** value to index */
	const map = new Map<number, number>();
	for (let i = 0; i < numbers.length; ++i)
		map.set(numbers[i], i);
	for (let i = 0; i < numbers.length; ++i) {
		const a = numbers[i];
		const b = target - a;
		const bIndex = map.get(b);
		if (bIndex !== undefined)
			return [i + 1, bIndex + 1];
	}
	return [0, 0];
}

if (import.meta.main) {
	const numbers = [2,7,11,15], target = 9;
	console.log(twoSum(numbers, target));
}
