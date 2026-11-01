class Item {
	constructor(readonly index: number, readonly value: number) {}
}

function containsNearbyAlmostDuplicate(inputs: number[], indexDiff: number, valueDiff: number): boolean {
	const sortedInputs = inputs.map((value, index) => new Item(index, value));
	sortedInputs.sort(function(a, b) {
		return a.value - b.value;
	});
	const sortedIndexes = new Map<number, number[]>();
	let index = 0;
	for (const sortedInput of sortedInputs) {
		let indexes = sortedIndexes.get(sortedInput.value);
		if (!indexes) {
			indexes = [];
			sortedIndexes.set(sortedInput.value, indexes);
		}
		indexes.push(index);
		++index;
	}
	for (let inputIndex = 0; inputIndex < inputs.length; ++inputIndex) {
		const item = inputs[inputIndex] ?? 0;
		const indexes = sortedIndexes.get(item) ?? [];
		const sortedIndex = indexes.shift() ?? 0;
		const low = item - valueDiff;
		for (let i = sortedIndex - 1; i >= 0; --i) {
			const sortedInput = sortedInputs[i];
			if (!sortedInput)
				break;
			if (sortedInput.value < low)
				break;
			if (Math.abs(sortedInput.index - inputIndex) <= indexDiff) {
				return true;
			}
		}
		const high = item + valueDiff;
		for (let i = sortedIndex + 1; sortedInputs.length; ++i) {
			const sortedInput = sortedInputs[i];
			if (!sortedInput)
				break;
			if (sortedInput.value > high)
				break;
			if (Math.abs(sortedInput.index - inputIndex) <= indexDiff) {
				return true;
			}
		}
	}
	return false;
}


///---

let nums = [1,2,3,1], indexDiff = 3, valueDiff = 0;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff));
