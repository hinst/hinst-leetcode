function nextPermutation(numbers: number[]): void {
	for (let i = numbers.length - 2; i >= 0 ; --i) {
		const iNext = i + 1;
		if (numbers[i] < numbers[iNext]) {
			const buffer = numbers[i];
			numbers[i] = numbers[iNext];
			numbers[iNext] = buffer;
			break;
		}
	}
}

const nums = [1,2,3];
nextPermutation(nums);
console.log(nums);