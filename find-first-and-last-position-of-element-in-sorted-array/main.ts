function searchRange(numbers: number[], target: number): number[] {
	let left = -1;
	let right = -1
	for (let i = 0; i < numbers.length; ++i) {
		if (numbers[i] === target && left === -1)
			left = i;
		if (numbers[i] === target)
			right = i;
		if (left !== -1 && numbers[i] !== target)
			break;
	}
	return [left, right];
}

export const searchRangeExported = searchRange;