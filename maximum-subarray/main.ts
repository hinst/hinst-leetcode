function maxSubArray(numbers: number[]): number {
    let max = Number.MIN_SAFE_INTEGER;
	let previous = 0;
	for (const item of numbers) {
		const sum = Math.max(previous + item, item);
		if (max < sum)
			max = sum;
		previous = sum;
	}
	return max;
}

export const maxSubArrayEx = maxSubArray;

if (import.meta.main) {
}
