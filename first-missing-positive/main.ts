function firstMissingPositive(numbers: number[]): number {
	numbers.sort((a, b) => a - b);
	for (let i = 0; i < numbers.length; ++i) {
		const item = numbers[i];
		if (item > 0) {
			if (i === 0)
				return 1;
			else {
				const next = item + 1;
				if (numbers[i + 1] !== next)
					return next;
			}
		}
	}
	return 0;
}

export const firstMissingPositiveExported = firstMissingPositive;