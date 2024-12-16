class Point {
	constructor(
		public readonly x: number,
		public readonly y: number,
	) {}

	getFlat(width: number) {
		return this.x + this.y * width;
	}

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
	const takenPoints = new Set<number>();
	function find(point: Point, index: number): boolean {
		if (index >= word.length)
			return true;
		let points = point.getSurrounding()
			.filter(point => board[point.y]?.[point.x] === word[index]);
		const flatPoints = points.map(point => point.getFlat(width));
		points = points.filter((_, i) => !takenPoints.has(flatPoints[i]));
		for (const flatPoint of flatPoints)
			takenPoints.add(flatPoint);
		return points.some(point => find(point, index + 1));
	}
	for (let y = 0; y < height; ++y) {
		for (let x = 0; x < width; ++x) {
			if (board[y][x] === word[0]) {
				const point = new Point(x, y);
				takenPoints.add(point.getFlat(width));
				const found = find(point, 1);
				if (found)
					return true;
				takenPoints.clear();
			}
		}
	}
	return false;
}

if (import.meta.main) {
	{
		const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED";
		console.log(exist(board, word));
	}
	{
		const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB";
		console.log(exist(board, word));
	}
}
