function findMin(numbers: number[], beginning = 0, ending = numbers.length - 1): number {
	const middle = Math.floor((beginning + ending) / 2);
	if (numbers[beginning] < numbers[ending])
		return numbers[beginning];
    if (beginning === ending)
		return numbers[beginning];
	if (beginning + 1 === ending)
		return numbers[ending];

	if (numbers[beginning] < numbers[middle]) {
		return findMin(numbers, middle, ending);
	} else if (numbers[middle] < numbers[ending]) {
		return findMin(numbers, beginning, middle);
	} else {
		let left = middle;
		while (numbers[left] === numbers[middle] && beginning < left)
			--left;
		let right = middle;
		while (numbers[right] === numbers[middle] && right < ending - 1)
			++right;
		if (numbers[left] < numbers[middle])
			return findMin(numbers, beginning, left);
		else
			return findMin(numbers, right, ending);
	}
}


export const findMinEx = findMin;

if (import.meta.main) {
	const nums = [1,2,2,2,2,0];
	console.log(findMin(nums));
}
