const LIMIT = 10;

function mergeIndex(x: number, y: number): number {
	return x + y * LIMIT;
}

function splitIndex(index: number): [number, number] {
	const y = Math.trunc(index / LIMIT);
	const x = index % LIMIT;
	return [x, y];
}

function solveNQueens(n: number): string[][] {
	const resultChains = new Set<string>();
	const availablePlacesSet = new Set<number>();
	for (let x = 0; x < n; ++x)
		for (let y = 0; y < n; ++y)
			availablePlacesSet.add(mergeIndex(x, y));
	const currentChain: number[] = [];

	function markOccupied(x: number, y: number, array: number[]) {
		const index = mergeIndex(x, y);
		if (availablePlacesSet.delete(index))
			array.push(index);
	}
	function next(index: number) {
		if (index >= n) {
			const key = currentChain.slice().sort((a, b) => a - b).join(';');
			resultChains.add(key);
		}
		if (availablePlacesSet.size === 0)
			return false;
		const availablePlacesArray = Array.from(availablePlacesSet);
		for (const availablePlace of availablePlacesArray) {
			currentChain.push(availablePlace);
			const [placedX, placedY] = splitIndex(availablePlace);
			const occupiedPlaces: number[] = [];
			for (let x = 0; x < n; ++x)
				markOccupied(x, placedY, occupiedPlaces);
			for (let y = 0; y < n; ++y)
				markOccupied(placedX, y, occupiedPlaces);
			for (let x = placedX, y = placedY; x < n && y < n; ++x, ++y)
				markOccupied(x, y, occupiedPlaces);
			for (let x = placedX, y = placedY; x >= 0 && y >= 0; --x, --y)
				markOccupied(x, y, occupiedPlaces);
			for (let x = placedX, y = placedY; x < n && y >= 0; ++x, --y)
				markOccupied(x, y, occupiedPlaces);
			for (let x = placedX, y = placedY; x >= 0 && y < n; --x, ++y)
				markOccupied(x, y, occupiedPlaces);
			next(index + 1);
			for (const occupiedPlace of occupiedPlaces)
				availablePlacesSet.add(occupiedPlace);
			currentChain.pop();
		}
	}
	next(0);
	const results: string[][] = [];
	for (const resultChain of resultChains) {
		const fieldTexts = new Array(n).fill('').map(_ => new Array(n).fill('.'));
		for (const indexString of resultChain.split(';')) {
			const index = parseInt(indexString);
			const [x, y] = splitIndex(index);
			fieldTexts[y][x] = 'Q';
		}
		results.push(fieldTexts.map(line => line.join('')));
	}
	return results;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	const variants = solveNQueens(parseInt(Deno.args[0]));
	console.log(variants.length);
}
