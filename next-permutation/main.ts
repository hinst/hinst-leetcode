function nextPermutation(numbers: number[]): void {
	let done = false;
	for (let iLeft = numbers.length - 2; iLeft >= 0 ; --iLeft) {
		const iNext = iLeft + 1;
		// find min on the right?
		if (numbers[iLeft] < numbers[iNext]) {
			const rightNumbers = numbers.slice(iNext).sort((a, b) => a - b);
			for (let i = 0; i < rightNumbers.length; ++i)
				numbers[iNext + i] = rightNumbers[i];
			const buffer = numbers[iLeft];
			numbers[iLeft] = numbers[iNext];
			numbers[iNext] = buffer;
			done = true;
			break;
		}
	}
	if (!done) {
		const limit = Math.trunc(numbers.length / 2);
		for (let i = 0; i < limit; ++i) {
			const iRight = numbers.length - 1 - i;
			const buffer = numbers[i];
			numbers[i] = numbers[iRight];
			numbers[iRight] = buffer;
		}
	}
}

const nums = [1,2,3];
nextPermutation(nums);
console.log(nums);