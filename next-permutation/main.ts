function nextPermutation(numbers: number[]): void {
	let done = false;
	for (let i = numbers.length - 2; i >= 0 ; --i) {
		const iNext = i + 1;
		if (numbers[i] < numbers[iNext]) {
			const buffer = numbers[i];
			numbers[i] = numbers[iNext];
			numbers[iNext] = buffer;
			done = true;
			break;
		}
	}
	if (!done) {
		console.log('not done');
		const limit = Math.trunc(numbers.length / 2);
		for (let i = 0; i < limit; ++i) {
			const iRight = numbers.length - 1 - i;
			const buffer = numbers[i];
			numbers[i] = numbers[iRight];
			numbers[iRight] = buffer;
		}
	}
}

const nums = [3,2,1];
nextPermutation(nums);
console.log(nums);