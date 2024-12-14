type Point = { x: number; y: number }

function setZeroes(matrix: number[][]): void {
	const clearedColumns = new Set<number>();
	const clearedRows = new Set<number>();
	const zeroPoints: Point[] = [];
	for (let y = 0; y < matrix.length; ++y)
		for (let x = 0; x < matrix[y].length; ++x)
			if (matrix[y][x] === 0)
				zeroPoints.push({x, y});
	for (const point of zeroPoints) {
		const x = point.x;
		const y = point.y;
		if (!clearedColumns.has(x)) {
			for (let y = 0; y < matrix.length; ++y)
				matrix[y][x] = 0;
			clearedColumns.add(x);
		}
		if (!clearedRows.has(y)) {
			for (let x = 0; x < matrix[y].length; ++x)
				matrix[y][x] = 0;
		}
	}
}

if (import.meta.main) {
	const matrix = [[1,1,1],[1,0,1],[1,1,1]];
	setZeroes(matrix);
	console.log(matrix);
}
