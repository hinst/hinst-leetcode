function search(numbers: number[], target: number): boolean {
	const offset = findTurningPosition(numbers, 0, numbers.length - 1) || 0;
	return findInShifted(numbers, 0, numbers.length - 1, offset, target) !== -1;
}

function findTurningPosition(numbers: number[], left: number, right: number): number | undefined {
	if (right <= left)
		return undefined;
	if (numbers[left] > numbers[right] && left + 1 === right)
		return right;
	if (left + 1 === right)
		return undefined;
	const middle = Math.floor((left + right) / 2);
	const leftOffset = numbers[left] < numbers[middle]
		? undefined
		: findTurningPosition(numbers, left, middle);
	const rightOffset = numbers[middle] < numbers[right]
		? undefined
		: findTurningPosition(numbers, middle, right);
	return leftOffset !== undefined ? leftOffset : rightOffset;
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

function arrayToString(numbers: number[], offset: number) {
	let text = '';
	for (let i = 0; i < numbers.length; ++i)
		text += numbers[(i + offset) % numbers.length] + ' ';
	return text;
}

export function findTurningPositionEx(numbers: number[], left: number = 0, right: number = numbers.length - 1) {
	return findTurningPosition(numbers, left, right)
}

if (import.meta.main) {
	console.log(search([1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1], 2));
}
