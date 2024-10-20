function firstMissingPositive(numbers: number[]): number {
	numbers.sort((a, b) => a - b);
	for (let i = 0; i < numbers.length; ++i) {
		const item = numbers[i];
		if (item === 0 && numbers[i+1] !== 1)
			return 1;
		if (item > 0) {
			if ((i === 0 || numbers[i - 1] < 0) && item > 1)
				return 1;
			else {
				const nextValue = item + 1;
				const nextItem = numbers[i + 1];
				if (nextItem !== nextValue && nextItem !== item)
					return nextValue;
			}
		}
	}
	return 1;
}

export const firstMissingPositiveExported = firstMissingPositive;