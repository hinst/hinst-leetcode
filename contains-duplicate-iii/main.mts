class Item {
	constructor(readonly index: number, readonly value: number) {}
}

function findClosePairs(arr1: number[], arr2: number[], diffLimit: number): boolean {
	let left = 0;
	let right = 0;
	for (const item1 of arr1) {
		while (left < arr2.length && arr2[left]! < item1 - diffLimit)
			left++;
		while (right < arr2.length && arr2[right]! <= item1 + diffLimit)
			right++;
		if (left < right)
			return true;
	}
	return false;
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
			if (findClosePairs(lowIndexes, indexes, indexDiff))
				return true;
		}
		for (let i = ladderIndex + 1; i < ladderKeys.length; ++i) {
			const highKey = ladderKeys[i] ?? 0;
			if (highKey > highLimit)
				break;
			const highIndexes = ladderInputs.get(highKey);
			if (!highIndexes)
				break;
			if (findClosePairs(highIndexes, indexes, indexDiff))
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
