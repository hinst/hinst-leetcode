function firstMissingPositive(numbers: number[]): number {
	numbers.sort((a, b) => a - b);
	for (let i = 0; i < numbers.length; ++i) {
		const item = numbers[i];
		const nextItem = numbers[i + 1];
		if (item === 0 && nextItem !== 0 && nextItem !== 1)
			return 1;
		if (item > 0) {
			if ((i === 0 || numbers[i - 1] < 0) && item > 1)
				return 1;
			else {
				const nextValue = item + 1;
				if (nextItem !== nextValue && nextItem !== item)
					return nextValue;
			}
		}
	}
	return 1;
}

export const firstMissingPositiveExported = firstMissingPositive;

if (import.meta.main) {
	console.log(firstMissingPositive([1,2,2,1,3,1,0,4,0]));
}