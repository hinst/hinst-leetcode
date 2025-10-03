function maximumGap(items: number[]): number {
	let maxDiff = 0;
	if (items.length < 2)
		return maxDiff;
	items.sort((a, b) => a - b);
	for (let i = 1; i < items.length; ++i) {
		const diff = items[i] - items[i - 1];
		if (maxDiff < diff)
			maxDiff = diff;
	}
	return maxDiff;
}

if (import.meta.main) {
}
