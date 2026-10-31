function combinationSum3(k: number, n: number): number[][] {
	const possibilities: number[][] = [];
	function next(items: number[], remainingItems: number, remainingSum: number) {
		if (remainingSum === 0) {
			if (remainingItems === 0)
				possibilities.push([...items]);
			return;
		}
		if (remainingItems <= 0)
			return;
		const lowerLimit = items[items.length - 1] || 0;
		for (let i = lowerLimit + 1; i <= 9; ++i) {
			const nextRemainingSum = remainingSum - i;
			if (nextRemainingSum >= 0) {
				items.push(i);
				next(items, remainingItems - 1, nextRemainingSum);
				items.pop();
			}
		}
	}
	next([], k, n);
	return possibilities;
}


///---

console.log(combinationSum3(3, 7));