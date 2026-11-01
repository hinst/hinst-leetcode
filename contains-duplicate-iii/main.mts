class Item {
	constructor(readonly index: number, readonly value: number) {}
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
		for (let i = 0; i < indexes.length; ++i)
			for (let j = 0; j < i; ++j)
				if (Math.abs((indexes[i] ?? 0) - (indexes[j] ?? 0)) <= indexDiff)
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
			for (const lowIndex of lowIndexes)
				for (const index of indexes)
					if (Math.abs(lowIndex - index) <= indexDiff)
						return true;
		}
		for (let i = ladderIndex + 1; i < ladderKeys.length; ++i) {
			const highKey = ladderKeys[i] ?? 0;
			if (highKey > highLimit)
				break;
			const highIndexes = ladderInputs.get(highKey);
			if (!highIndexes)
				break;
			for (const highIndex of highIndexes)
				for (const index of indexes)
					if (Math.abs(highIndex - index) <= indexDiff)
						return true;
		}
	}
	return false;
}


///---

// let nums = [1,2,3,1], indexDiff = 3, valueDiff = 0;
// console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
// nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3;
// console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));

const nums = [1,2,1,1], indexDiff = 1, valueDiff = 0;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
