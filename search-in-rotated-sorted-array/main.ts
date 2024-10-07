function search(numbers: number[], target: number): number {
	const offset = findTurningPosition(numbers, 0, numbers.length - 1);
	console.log('turning point:', offset);
	return findInShifted(numbers, 0, numbers.length - 1, offset, target);
}

function findTurningPosition(numbers: number[], left: number, right: number): number {
	console.log(numbers.map((number, index) => (left <= index && index <= right ? number : '_')).join());
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
		while (index < 0)
			index += numbers.length;
		while (index >= numbers.length)
			index -= numbers.length;
		return index;
	}
	function getNumberAt(index: number) {
		return numbers[getTrueIndex(index)];
	}
	let text = '';
	console.log(offset);
	for (let i = 0; i < numbers.length; ++i) {
		if (left <= i && i <= right)
			text += getNumberAt(i) + ',';
		else
			text += '_,';
	}
	console.log(text);
	if (left >= right || left + 1 === right)
		return getNumberAt(left) === target
			? left
			: getNumberAt(right) === target
				? right
				: -1;
	const middle = Math.floor((left + right) / 2);
	if (getNumberAt(middle) < target)
		return findInShifted(numbers, middle, right, offset, target);
	else
		return findInShifted(numbers, left, middle, offset, target);
}

export const searchPublic = search;


console.log(search([6,7,8,0,1,2,3,4,5], 7));
console.log('---');
console.log(search([4,5,6,7,8,9,0,1,2], 0));
console.log('---');
console.log(search([0,1,2,3,4,5,6,7], 0));
console.log('---');
console.log(search([7,0,1,2,3,4,5,6], 0));
console.log('---');
console.log(search([1,2,3,4,5,6,7,0], 0));
