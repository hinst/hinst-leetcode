function singleNumber(items: number[]): number {
	const set = new Set<number>();
	for (const item of items) {
		if (set.has(item))
			set.delete(item);
		else
			set.add(item);
	}
	return Array.from(set)[0];
}

if (import.meta.main) {
	const nums = [4,1,2,1,2];
	console.log(singleNumber(nums));
}
