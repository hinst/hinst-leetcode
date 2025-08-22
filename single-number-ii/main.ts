function singleNumber(items: number[]): number {
	const candidates = new Set<number>();
	const duplicates = new Set<number>();
	for (const item of items) {
		if (duplicates.has(item))
			continue;
		if (candidates.has(item)) {
			candidates.delete(item);
			duplicates.add(item);
		} else
			candidates.add(item);
	}
	return Array.from(candidates)[0];
}

if (import.meta.main) {
	const nums = [0,1,0,1,0,1,99];
	console.log(singleNumber(nums));
}
