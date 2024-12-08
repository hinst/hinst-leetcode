class Point {
	constructor(
		public readonly x: number,
		public readonly y: number,
	) {}
}

function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
	const height = obstacleGrid.length;
	const width = obstacleGrid[0].length;
	function step(point: Point): boolean {
		if (width <= point.x || height <= point.y)
			return false;
		if (obstacleGrid[point.y][point.x] !== 0)
			return false;
		const leftX = point.x - 1;
		const topY = point.y - 1;
		const leftValue = leftX >= 0 ? Math.max(0, obstacleGrid[point.y][leftX]) : 0;
		const topValue = topY >= 0 ? Math.max(0, obstacleGrid[topY][point.x]) : 0;
		obstacleGrid[point.y][point.x] = leftValue + topValue;
		return true;
	}
	for (let y = 0; y < height; ++y)
		for (let x = 0; x < width; ++x)
			if (obstacleGrid[y][x] === 1)
				obstacleGrid[y][x] = -1;
	if (obstacleGrid[0][0] !== -1)
		obstacleGrid[0][0] = 1;
	const points: Point[] = [new Point(0, 0)];
	while (points.length) {
		const previousPoints = points.slice();
		points.length = 0;
		for (const point of previousPoints) {
			const right = new Point(point.x + 1, point.y);
			const bottom = new Point(point.x, point.y + 1);
			if (step(right))
				points.push(right);
			if (step(bottom))
				points.push(bottom);
		}
	}
	const exitCell = obstacleGrid[height - 1][width - 1];
	return Math.max(0, exitCell);
}

if (import.meta.main) {
	console.time('calculation');
	console.log(uniquePathsWithObstacles( [[0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,1,0,0],[1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,1,0,1],[0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0],[0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0,0],[1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0],[0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],[0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],[0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[1,0,1,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0],[0,0,0,1,0,0,0,0,1,1,1,0,0,1,0,1,1,0],[0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0],[0,0,0,0,0,0,1,0,1,0,0,1,0,1,1,1,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1],[0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0],[1,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,0],[1,0,1,0,1,0,0,0,0,0,0,1,1,0,0,0,0,1],[1,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0]] ));
	console.timeEnd('calculation');
}
