class Point {
	constructor(
		public readonly x: number,
		public readonly y: number,
	) {}

	getSurrounding(): Point[] {
		return [
			new Point(this.x, this.y - 1),
			new Point(this.x, this.y + 1),
			new Point(this.x - 1, this.y),
			new Point(this.x + 1, this.y),
		];
	}
}

function exist(board: string[][], word: string): boolean {
	const height = board.length;
	const width = board[0].length;
	const path: boolean[][] = new Array(height).fill(undefined).map(_ => new Array(width).fill(false));
	function find(point: Point, index: number): boolean {
		if (index >= word.length)
			return true;
		let points = point.getSurrounding()
			.filter(point => board[point.y]?.[point.x] === word[index]);
		points = points.filter(point => !path[point.y][point.x]);
		path[point.y][point.x] = true;
		const result = points.some(point => find(point, index + 1));
		path[point.y][point.x] = false;
		return result;
	}
	for (let y = 0; y < height; ++y) {
		for (let x = 0; x < width; ++x) {
			if (board[y][x] === word[0]) {
				path[y][x] = true;
				const found = find(new Point(x, y), 1);
				if (found)
					return true;
				path[y][x] = false;
			}
		}
	}
	return false;
}

export const existEx = exist;

if (import.meta.main) {
	{
		const board = [["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], word = "ABCESEEEFS";
		console.log(board.join('\n'));
		console.log(word);
		console.log(exist(board, word));
	}
}
