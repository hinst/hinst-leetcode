import { formatMatrix } from '../array.ts';

class Point {
	constructor(readonly row: number, readonly column: number) {
	}
}

class Dungeon {
	rowCount: number;
	columnCount: number;
	healths: number[][];

	constructor(readonly costs: number[][]) {
		this.healths = this.costs.map(row => row.map(_ => Number.MAX_SAFE_INTEGER));
		this.rowCount = this.costs.length;
		this.columnCount = this.costs[0].length;
	}

	calculate(): number {
		let points = [new Point(this.rowCount - 1, this.columnCount - 1)];
		while (points.length) {
			points = this.next(points);
		}
		return this.healths[0][0];
	}

	private next(points: Point[]): Point[] {
		const nextPoints: Point[] = [];
		for (const point of points) {
			const row = point.row;
			const column = point.column;
			if (this.healths[row][column] !== Number.MAX_SAFE_INTEGER)
				continue;
			const healthBottom = row < this.healths.length - 1
				? this.healths[row + 1][column]
				: undefined;
			const healthRight = column < this.healths[row].length - 1
				? this.healths[row][column + 1]
				: undefined;
			let health: number;
			if (healthBottom === undefined && healthRight === undefined) {
				health = - this.costs[row][column] + 1;
			} else {
				const choices = [healthBottom, healthRight].filter(item => item !== undefined);
				health = Math.min(...choices) - this.costs[row][column];
			}
			if (health < 1)
				health = 1;
			this.healths[row][column] = health;
			if (column > 0)
				nextPoints.push(new Point(row, column - 1));
			if (row > 0)
				nextPoints.push(new Point(row - 1, column));
		}
		return nextPoints;
	}
}

function calculateMinimumHP(dungeon: number[][]): number {
	const d = new Dungeon(dungeon);
	const result = d.calculate();
	// console.log(formatMatrix(d.healths));
	return result;
}


// ---

export const calculateMinimumHpEx = calculateMinimumHP;

if (import.meta.main) {
	const dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]];
	console.log('input\n' + formatMatrix(dungeon) + '\n');
	console.log(calculateMinimumHP(dungeon));
}
