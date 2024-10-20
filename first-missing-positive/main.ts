function firstMissingPositive(numbers: number[]): number {
	const numberSet = new Set(numbers);
	if (!numberSet.has(1))
		return 1;
	let result = Number.MAX_SAFE_INTEGER;
	for (const item of numbers) {
		if (item > 0 && item < result) {
			const next = item + 1;
			if (!numberSet.has(next))
				result = next;
		}
	}
	return result;
}

export const firstMissingPositiveExported = firstMissingPositive;

if (import.meta.main) {
	console.log(firstMissingPositive([1,2,2,1,3,1,0,4,0]));
}