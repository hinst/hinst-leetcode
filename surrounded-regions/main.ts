const _X = 'X';
const SIZE_LIMIT = 200;

class Point {
	constructor(public readonly x: number, public readonly y: number) {
	}

	getKey() {
		return this.x + this.y * SIZE_LIMIT;
	}

	writeNext(array: Point[]) {
		array.push(new Point(this.x - 1, this.y));
		array.push(new Point(this.x, this.y - 1));
		array.push(new Point(this.x + 1, this.y));
		array.push(new Point(this.x, this.y + 1));
	}

	static unwrap(key: number) {
		const x = key % SIZE_LIMIT;
		const y = (key - x) / SIZE_LIMIT;
		return new Point(x, y);
	}
}


function solve(board: string[][]): void {
	const checkedKeys = new Set<number>();
	for (let y = 0; y < board.length; ++y) {
		for (let x = 0; x < board[y].length; ++x) {
			if (board[y][x] === _X)
				continue;
			const point = new Point(x, y);
			if (checkedKeys.has(point.getKey()))
				continue;
			const keys = sweep(board, point);
			for (const key of keys)
				checkedKeys.add(key);
		}
	}
}

function sweep(board: string[][], point: Point): Set<number> {
	const sweptKeys = new Set<number>();
	let points = [point];
	let nextPoints: Point[] = [];
	let hasExit = false;
	while (points.length) {
		for (const point of points) {
			const key = point.getKey();
			if (sweptKeys.has(key))
				continue;
			if (point.y < 0 || point.x < 0)
				continue;
			if (board.length <= point.y || board[0].length <= point.x)
				continue;
			if (board[point.y][point.x] === _X)
				continue;
			sweptKeys.add(key);
			point.writeNext(nextPoints);
			if (point.x === 0 || point.y === 0 || point.y === board.length - 1 || point.x === board[0].length - 1)
				hasExit = true;
		}
		points = nextPoints;
		nextPoints = [];
	}
	// console.log(Array.from(allPoints).map(item => Point.unwrap(item)));
	if (!hasExit)
		for (const key of sweptKeys) {
			const point = Point.unwrap(key);
			board[point.y][point.x] = _X;
		}
	return sweptKeys;
}


if (import.meta.main) {
	const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
	solve(board);
	console.log(board);
}
