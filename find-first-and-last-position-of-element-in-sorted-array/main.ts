function searchRange(numbers: number[], target: number): number[] {
	const left = findLeft(numbers, 0, numbers.length - 1, target);
	if (left === -1)
		return [-1, -1];
	const right = findRight(numbers, left, numbers.length - 1, target);
	return [left, right];
}

function findLeft(numbers: number[], left: number, right: number, target: number): number {
	const middle = Math.floor((left + right) / 2);
	if (numbers[middle] === target && (middle === 0 || numbers[middle - 1] !== target))
		return middle;
	if (right <= left)
		return -1;
	if (target <= numbers[middle])
		return findLeft(numbers, left, middle - 1, target);
	else
		return findLeft(numbers, middle + 1, right, target);
}

function findRight(numbers: number[], left: number, right: number, target: number): number {
	const middle = Math.floor((left + right) / 2);
	if (numbers[middle] === target && (middle === numbers.length - 1 || numbers[middle + 1] !== target))
		return middle;
	if (right <= left)
		return -1;
	if (target < numbers[middle])
		return findRight(numbers, left, middle - 1, target);
	else
		return findRight(numbers, middle + 1, right, target);
}


export const searchRangeExported = searchRange;

console.log(searchRange([5,7,7,8,8,10], 8));