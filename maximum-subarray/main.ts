function maxSubArray(numbers: number[]): number {
    let max = Number.MIN_SAFE_INTEGER;
	let previous = 0;
	for (const item of numbers) {
		if (previous < 0)
			previous = 0;
		const sum = previous + item;
		if (max < sum)
			max = sum;
		previous = sum;
	}
	return max;
}

export const maxSubArrayEx = maxSubArray;

if (import.meta.main) {
}
