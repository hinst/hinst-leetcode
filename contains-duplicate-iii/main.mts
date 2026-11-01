class Item {
	constructor(readonly index: number, readonly value: number) {}
}

function findCloseItems(sortedArray1: number[], sortedArray2: number[], maxDiff: number) {
	for (const a of sortedArray1) {
		for (const b of sortedArray2) {
			const diff = b - a;
			if (diff > maxDiff)
				break; // Moving through sorted array, the difference can only get bigger
			if (Math.abs(diff) <= maxDiff)
				return true;
		}
	}
	return false;
}

function subtract(a: number, b: number) {
	return a - b;
}

/**
	@returns Map from value to its indexes in the inputs array
*/
function buildLadder(inputs: number[]) {
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
		indexes.sort(subtract);
	return ladderInputs;
}

function containsNearbyAlmostDuplicate(inputs: number[], indexDiff: number, valueDiff: number): boolean {
	const ladderInputs = buildLadder(inputs);
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
			if (findCloseItems(indexes, lowIndexes, indexDiff))
				return true;
		}
		for (let i = ladderIndex + 1; i < ladderKeys.length; ++i) {
			const highKey = ladderKeys[i] ?? 0;
			if (highKey > highLimit)
				break;
			const highIndexes = ladderInputs.get(highKey);
			if (!highIndexes)
				break;
			if (findCloseItems(indexes, highIndexes, indexDiff))
				return true;
		}
	}
	return false;
}


///---

let nums = [1,2,3,1], indexDiff = 3, valueDiff = 0;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
nums = [1,2,1,1], indexDiff = 1, valueDiff = 0;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
