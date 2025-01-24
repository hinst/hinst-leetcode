class Key {
	constructor(
		public readonly value: number,
		public readonly limitCount: number,
		public currentCount: number = 0
	) {}
}

function subsetsWithDup(sourceItems: number[]): number[][] {
	const keys = getCountedSourceItems(sourceItems);
	const results: number[][] = [];
	do {
		const item: number[] = [];
		for (const key of keys) {
			for (let i = 0; i < key.currentCount; ++i)
				item.push(key.value);
		}
		results.push(item);
	} while (advanceKeys(keys));
	return results;
}

function getCountedSourceItems(sourceItems: number[]): Key[] {
	const countMap = new Map<number, number>();
	for (const item of sourceItems)
		countMap.set(item, (countMap.get(item) || 0) + 1);
	return Array.from(countMap, pair => new Key(pair[0], pair[1]));
}

function advanceKeys(keys: Key[]): boolean {
	let additional = 1;
	for (const key of keys) {
		key.currentCount += additional;
		if (key.currentCount <= key.limitCount) {
			additional = 0;
			break;
		} else
			key.currentCount = 0;
	}
	return additional === 0;
}

if (import.meta.main) {
	console.log(subsetsWithDup([1, 2, 2]));
}
