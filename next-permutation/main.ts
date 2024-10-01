function nextPermutation(numbers: number[]): void {
	const turningIndex = findTurningIndex(numbers);
	console.log({turningIndex});
	if (turningIndex !== -1) {
		const turningValue = numbers[turningIndex];
		for (let i = turningIndex + 1; i < numbers.length; ++i)
			if (turningValue < numbers[i]) {
				console.log({i});
				swap(numbers, turningIndex, i);
				break;
			}
	}
	console.log(numbers);
	reverseArray(numbers, turningIndex + 1);
}

function swap(numbers: number[], firstIndex: number, secondIndex: number) {
	const buffer = numbers[firstIndex];
	numbers[firstIndex] = numbers[secondIndex];
	numbers[secondIndex] = buffer;
}

/** Find the first index in the array, where current value is less the next value.
	Returns -1 if the turning point was not found */
function findTurningIndex(numbers: number[]) {
	for (let i = numbers.length - 2; i >= 0; --i)
		if (numbers[i] < numbers[i + 1])
			return i;
	return -1;
}

function reverseArray(numbers: number[], start: number) {
	for (let end = numbers.length - 1; start < end; ++start, --end)
		swap(numbers, start, end);
}

const nums = [1,3,2];
console.log(nums);
nextPermutation(nums);
console.log(nums);