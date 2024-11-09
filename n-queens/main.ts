const LIMIT = 10;

function mergePlace(x: number, y: number): number {
	return x + y * LIMIT;
}

function splitPlace(index: number): [number, number] {
	const y = Math.trunc(index / LIMIT);
	const x = index % LIMIT;
	return [x, y];
}

function solveNQueens(n: number): string[][] {
	const results: string[][] = [];
	const availablePlacesSet = new Set<number>();
	for (let x = 0; x < n; ++x)
		for (let y = 0; y < n; ++y)
			availablePlacesSet.add(mergePlace(x, y));
	const currentChain: number[] = [];
	function next(index: number) {
		if (availablePlacesSet.size === 0)
			return false;
		const availablePlacesArray = Array.from(availablePlacesSet);
		for (let i = 0; i < availablePlacesArray.length; ++i) {
		}
	}
	return results;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(solveNQueens(4));
}
