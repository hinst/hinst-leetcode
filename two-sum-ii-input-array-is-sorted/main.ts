function twoSum(numbers: number[], target: number): number[] {
	for (let x = 0; x < numbers.length; ++x) {
		for (let y = x + 1; y < numbers.length; ++y) {
			if (numbers[x] + numbers[y] === target)
				return [x + 1, y + 1];
		}
	}
	return [0, 0];
}

if (import.meta.main) {
	const numbers = [2,7,11,15], target = 9;
	console.log(twoSum(numbers, target));
}
