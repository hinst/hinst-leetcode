function search(numbers: number[], target: number): boolean {
	const offset = findTurningPosition(numbers, 0, numbers.length - 1);
	console.log({offset});
	return findInShifted(numbers, 0, numbers.length - 1, offset, target) !== -1;
}

function findTurningPosition(numbers: number[], left: number, right: number): number {
	if (numbers[left] <= numbers[right])
		return (right + 1) % numbers.length;
	const middle = Math.floor((left + right) / 2);
	if (numbers[left] < numbers[middle])
		return findTurningPosition(numbers, middle, right);
	else
		return findTurningPosition(numbers, left, middle);
}

function findInShifted(numbers: number[], left: number, right: number, offset: number, target: number): number {
	function getTrueIndex(index: number) {
		index += offset;
		while (index >= numbers.length)
			index -= numbers.length;
		return index;
	}
	function getNumberAt(index: number) {
		return numbers[getTrueIndex(index)];
	}
	if (right <= left || left + 1 === right) {
		const trueLeft = getTrueIndex(left);
		if (numbers[trueLeft] === target)
			return trueLeft;
		const trueRight = getTrueIndex(right);
		if (numbers[trueRight] === target)
			return trueRight;
		return -1;
	}
	const middle = Math.floor((left + right) / 2);
	if (getNumberAt(middle) < target)
		return findInShifted(numbers, middle, right, offset, target);
	else
		return findInShifted(numbers, left, middle, offset, target);
}

if (import.meta.main) {
	console.log(search([2,5,6,0,0,1,2], 0));
}
