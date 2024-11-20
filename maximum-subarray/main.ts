function maxSubArray(numbers: number[]): number {
    let max = Number.MIN_SAFE_INTEGER;
	for (let i = 0; i < numbers.length; ++i) {
		let sum = 0;
		for (let j = i; j < numbers.length; ++j) {
			sum += numbers[j];
			if (max < sum)
				max = sum;
		}
	}
	return max;
}

export const maxSubArrayEx = maxSubArray;

if (import.meta.main) {
}
