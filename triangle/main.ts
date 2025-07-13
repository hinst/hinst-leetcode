/*
Given a triangle array, return the minimum path sum from top to bottom.
For each step, you may move to an adjacent number of the row below.
More formally, if you are on index i on the current row, you may move
to either index i or index i + 1 on the next row.
*/

function minimumTotal(triangle: number[][], sum = 0, x = 0, y = 0): number {
	if (y >= triangle.length)
		return sum;
	sum += triangle[y][x];
	y += 1;
	return Math.min(minimumTotal(triangle, sum, x, y), minimumTotal(triangle, sum, x + 1, y));
}

if (import.meta.main) {
	const triangle = [[2],[3,4],[6,5,7],[4,1,8,3]];
	console.log(minimumTotal(triangle));
}
