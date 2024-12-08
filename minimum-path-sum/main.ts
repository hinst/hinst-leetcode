class Point {
	constructor(
		public readonly x: number,
		public readonly y: number,
	) {}

	getFlat(width: number) {
		return this.x + this.y * width;
	}
}

function unpackPoint(flat: number, width: number): Point {
	return new Point(flat % width, Math.trunc(flat / width));
}

function minPathSum(grid: number[][]): number {
	const height = grid.length;
	const width = grid[0].length;
	const paths: number[][] = new Array(height).fill(null).map(() => new Array(width));
	function step(point: Point): boolean {
		if (width <= point.x || height <= point.y)
			return false;
		const leftX = point.x - 1;
		const topY = point.y - 1;
		const leftValue = leftX >= 0 ? paths[point.y][leftX] : undefined;
		const topValue = topY >= 0 ? paths[topY][point.x] : undefined;
		const sourceSum = leftValue === undefined
			? topValue
			: topValue === undefined
				? leftValue
				: Math.min(leftValue, topValue);
		if (undefined === sourceSum)
			return false;
		const targetSum = sourceSum + grid[point.y][point.x];
		const existingStep = paths[point.y][point.x];
		paths[point.y][point.x] = existingStep !== undefined
			? Math.min(existingStep, targetSum)
			: targetSum;
		return true;
	}
	paths[0][0] = grid[0][0];
	const points: Set<number> = new Set([0]);
	while (points.size) {
		const previousPoints = Array.from(points).map(flat => unpackPoint(flat, width));
		points.clear();
		for (const point of previousPoints) {
			const right = new Point(point.x + 1, point.y);
			const bottom = new Point(point.x, point.y + 1);
			if (step(right))
				points.add(right.getFlat(width));
			if (step(bottom))
				points.add(bottom.getFlat(width));
		}
	}
	return paths[height - 1][width - 1];
}

if (import.meta.main) {
	console.log(minPathSum( [[1,3,1],[1,5,1],[4,2,1]] ));
	console.log(minPathSum( [[1,2,3],[4,5,6]] ));
}
