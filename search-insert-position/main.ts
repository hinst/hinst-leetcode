function searchInsert(items: number[], target: number): number {
	let left = 0;
	let right = items.length - 1;
	while (left <= right) {
		const middle = Math.floor((left + right) / 2);
		const item = items[middle];
		if (item === target) {
			left = middle;
			break;
		}
		if (item < target)
			left = middle + 1;
		else
			right = middle - 1;
	}
	return left;
}

console.log(searchInsert([1,3,5,6], 5));