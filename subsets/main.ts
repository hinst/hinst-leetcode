function subsets(sources: number[]): number[][] {
	const limit = sources.length;
	const selectedElements = new Array<number>();
	const sourceElements = new Set<number>(sources);
	const results: number[][] = [[]];
	function combine(index: number) {
		if (index >= limit) {
			results.push(selectedElements.slice(0));
			return;
		}
		const sources = Array.from(sourceElements);
		const previous = index > 0 ? selectedElements[index - 1] : 0;
		for (let i = 0; i < sources.length; ++i) {
			const source = sources[i];
			if (source < previous)
				continue;
			selectedElements.push(source);
			sourceElements.delete(source);
			results.push(selectedElements.slice(0));
			combine(index + 1);
			sourceElements.add(source);
			selectedElements.pop();
		}
	}
	combine(0);
	return results;
}

if (import.meta.main) {
	console.log(subsets([1, 2, 3]).join('\n'));
}
