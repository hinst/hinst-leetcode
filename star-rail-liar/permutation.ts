export function nextPermutation(numbers: number[]): boolean {
	const turningIndex = findTurningIndex(numbers);
	if (turningIndex !== -1)
		swap(numbers, turningIndex, findSwappingIndex(numbers, turningIndex));
	reverseArray(numbers, turningIndex + 1);
	return turningIndex !== -1;
}

/** Find the first index in the array, where current value is less the next value.
	Returns -1 if the turning point was not found */
function findTurningIndex(numbers: number[]) {
	for (let i = numbers.length - 2; i >= 0; --i)
		if (numbers[i] < numbers[i + 1])
			return i;
	return -1;
}

function findSwappingIndex(numbers: number[], turningIndex: number) {
	const turningValue = numbers[turningIndex];
	for (let swappingIndex = numbers.length - 1; turningIndex < swappingIndex; --swappingIndex)
		if (turningValue < numbers[swappingIndex])
			return swappingIndex;
	return -1;
}

function swap(numbers: number[], firstIndex: number, secondIndex: number) {
	const buffer = numbers[firstIndex];
	numbers[firstIndex] = numbers[secondIndex];
	numbers[secondIndex] = buffer;
}

function reverseArray(numbers: number[], start: number) {
	for (let end = numbers.length - 1; start < end; ++start, --end)
		swap(numbers, start, end);
}