function maxSubArray(numbers: number[]): number {
    let max = Number.MIN_SAFE_INTEGER;
	for (let i = 0; i < numbers.length; ++i) {
		for (let j = i; j < numbers.length; ++j) {
			let sum = 0;
			for (let itemIndex = i; itemIndex <= j; ++itemIndex)
				sum += numbers[itemIndex];
			if (max < sum)
				max = sum;
		}
	}
	return max;
}

if (import.meta.main) {
	console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
	console.log(maxSubArray([1]));
}
