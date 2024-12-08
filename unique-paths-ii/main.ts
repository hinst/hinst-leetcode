type Point = { x: number; y: number };

function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
	const height = obstacleGrid.length;
	const width = obstacleGrid[0].length;
	function step(point: Point): boolean {
		if (width <= point.x || height <= point.y)
			return false;
		if (obstacleGrid[point.y][point.x] === -1)
			return false;
		const left = { x: point.x - 1, y: point.y };
		const top = { x: point.x, y: point.y - 1 };
		const leftValue = left.x >= 0 ? Math.max(0, obstacleGrid[left.y][left.x]) : 0;
		const topValue = top.y >= 0 ? Math.max(0, obstacleGrid[top.y][top.x]) : 0;
		obstacleGrid[point.y][point.x] = leftValue + topValue;
		return true;
	}
	obstacleGrid.forEach((row, y) => {
		row.forEach((cell, x) => {
			if (cell === 1)
				obstacleGrid[y][x] = -1;
		});
	});
	obstacleGrid[0][0] = 1;
	const points: Point[] = [{x: 0, y: 0}];
	while (points.length) {
		const previousPoints = points.slice(0);
		points.length = 0;
		for (const point of previousPoints) {
			const right = { x: point.x + 1, y: point.y };
			const bottom = { x: point.x, y: point.y + 1};
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
	console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]));
}
