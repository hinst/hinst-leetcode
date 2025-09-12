function findMin(numbers: number[], beginning = 0, ending = numbers.length - 1): number {
	if (numbers[beginning] < numbers[ending])
		return numbers[beginning];
    if (beginning === ending)
		return numbers[beginning];
	const middle = Math.floor((beginning + ending) / 2);
	if (beginning + 1 === ending)
		return numbers[ending];
	if (numbers[beginning] < numbers[middle])
		return findMin(numbers, middle, ending);
	else
		return findMin(numbers, beginning, middle);
}


export const findMinEx = findMin;

if (import.meta.main) {
	console.log(findMin([3,4,5,1,2]));
}
