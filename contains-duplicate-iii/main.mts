class Item {
	constructor(readonly index: number, readonly value: number) {}
}

function findIndex(array: number[], value: number) {
	if (array.length === 0)
		return -1;
	if (array.length === 1)
		return 0;
	return findIndexInternal(array, value, 0, array.length - 1);
}

function findIndexInternal(array: number[], value: number, a: number, b: number): number {
	if (b <= a) {
		const indexes = [a - 1, a, a + 1];
		const diffs = indexes.map(index => {
			const item = array[index];
			if (!item)
				return null;
			return {
				index: index,
				diff: Math.abs(value - item),
			};
		}).filter(diff => diff != null);
		diffs.sort((left, right) => left.diff - right.diff);
		return diffs[0]?.index ?? 0;
	}
	const middleIndex = Math.trunc((a + b) / 2);
	const middleValue = array[middleIndex] ?? 0;
	if (value < middleValue)
		return findIndexInternal(array, value, a, middleIndex - 1);
	if (middleValue < value)
		return findIndexInternal(array, value, middleIndex + 1, b);
	return middleIndex;
}

function containsNearbyAlmostDuplicate(inputs: number[], indexDiff: number, valueDiff: number): boolean {
	const sortedInputs = inputs.map((value, index) => new Item(index, value));
	sortedInputs.sort(function(a, b) {
		return a.value - b.value;
	});
	const ladderInputs = new Map<number, number[]>();
	for (const sortedInput of sortedInputs) {
		let indexes = ladderInputs.get(sortedInput.value);
		if (!indexes) {
			indexes = [];
			ladderInputs.set(sortedInput.value, indexes);
		}
		indexes.push(sortedInput.index);
	}
	for (const indexes of ladderInputs.values())
		indexes.sort(function(a, b) {
			return a - b;
		});
	const ladderKeys = Array.from(ladderInputs.keys());
	for (let ladderIndex = 0; ladderIndex < ladderKeys.length; ++ladderIndex) {
		const ladderKey = ladderKeys[ladderIndex] ?? 0;
		const indexes = ladderInputs.get(ladderKey) ?? [];
		for (let i = 1; i < indexes.length; ++i)
			if (Math.abs((indexes[i] ?? 0) - (indexes[i - 1] ?? 0)) <= indexDiff)
				return true;
		const lowLimit = ladderKey - valueDiff;
		const highLimit = ladderKey - valueDiff;
		for (let i = ladderIndex - 1; i >= 0; --i) {
			const lowKey = ladderKeys[i] ?? 0;
			if (lowKey < lowLimit)
				break;
			const lowIndexes = ladderInputs.get(lowKey);
			if (!lowIndexes)
				break;
			for (const lowIndex of lowIndexes) {
				const middle = findIndex(indexes, lowIndex);
				const a = indexes[middle - 1];
				if (a != null && (Math.abs(lowIndex - a) <= indexDiff))
					return true;
				const b = indexes[middle];
				if (b != null && (Math.abs(lowIndex - b) <= indexDiff))
					return true;
			}
		}
		for (let i = ladderIndex + 1; i < ladderKeys.length; ++i) {
			const highKey = ladderKeys[i] ?? 0;
			if (highKey > highLimit)
				break;
			const highIndexes = ladderInputs.get(highKey);
			if (!highIndexes)
				break;
			for (const highIndex of highIndexes) {
				const middle = findIndex(indexes, highIndex);
				const a = indexes[middle - 1];
				if (a != null && (Math.abs(highIndex - a) <= indexDiff))
					return true;
				const b = indexes[middle];
				if (b != null && (Math.abs(highIndex - b) <= indexDiff))
					return true;
			}
		}
	}
	return false;
}


///---

export const findIndexPublic = findIndex;

let nums = [1,2,3,1], indexDiff = 3, valueDiff = 0;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
nums = [1,2,1,1], indexDiff = 1, valueDiff = 0;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
