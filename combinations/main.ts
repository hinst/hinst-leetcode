function combine(sourceLength: number, selectionLimit: number): number[][] {
	const selectedElements = new Array<number>(selectionLimit);
	const sourceElements = new Set<number>();
	for (let i = 0; i < sourceLength; ++i)
		sourceElements.add(i + 1);
	const results: number[][] = [];
	function combine(index: number) {
		if (index >= selectionLimit) {
			results.push(selectedElements.slice(0));
			return;
		}
		const sources = Array.from(sourceElements);
		const previous = index > 0 ? selectedElements[index - 1] : 0;
		for (let i = 0; i < sources.length; ++i) {
			const source = sources[i];
			if (source < previous)
				continue;
			selectedElements[index] = source;
			sourceElements.delete(source);
			combine(index + 1);
			sourceElements.add(source);
		}
	}
	combine(0);
	return results;
}

if (import.meta.main) {
	console.log(combine(4, 2));
	console.log(combine(1, 1));
}
