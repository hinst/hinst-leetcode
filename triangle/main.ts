/*
Given a triangle array, return the minimum path sum from top to bottom.
For each step, you may move to an adjacent number of the row below.
More formally, if you are on index i on the current row, you may move
to either index i or index i + 1 on the next row.
*/

function minimumTotal(triangle: number[][]): number {
	return new MinimumTotal(triangle).find(0, 0);
}

const MAX_Y = 201;

function getKey(x: number, y: number) {
	return x * MAX_Y + y;
}

class MinimumTotal {
	private readonly cache = new Map<number, number>();

	constructor(readonly triangle: number[][]) {
	}

	find(x: number, y: number): number {
		if (y >= this.triangle.length)
			return 0;
		const item = this.triangle[y][x];
		y += 1;
		const cacheKey = getKey(x, y);
		let nextSum = this.cache.get(cacheKey);
		if (nextSum !== undefined)
			return item + nextSum;
		nextSum = Math.min(this.find(x, y), this.find(x + 1, y));
		this.cache.set(cacheKey, nextSum);
		return item + nextSum;
	}
}

if (import.meta.main) {
	const triangle = [[2],[3,4],[6,5,7],[4,1,8,3]];
	console.log(minimumTotal(triangle));
}
