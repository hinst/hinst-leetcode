import { formatMatrix } from '../array.ts';

class Dungeon {
	readonly rowCount: number;
	readonly columnCount: number;
	healths: number[][];

	constructor(readonly costs: number[][]) {
		this.healths = this.costs.map(row => row.map(_ => Number.MAX_SAFE_INTEGER));
		this.rowCount = this.costs.length;
		this.columnCount = this.costs[0].length;
	}

	calculate(): number {
		for (let row = this.rowCount - 1; row >= 0; --row)
			for (let column = this.columnCount - 1; column >= 0; --column)
				this.next(row, column);
		return this.healths[0][0];
	}

	private next(row: number, column: number) {
		const healthBottom = row < this.rowCount - 1
			? this.healths[row + 1][column]
			: Number.MAX_SAFE_INTEGER;
		const healthRight = column < this.columnCount - 1
			? this.healths[row][column + 1]
			: Number.MAX_SAFE_INTEGER;
		let health: number;
		if (healthBottom === Number.MAX_SAFE_INTEGER && healthRight === Number.MAX_SAFE_INTEGER)
			health = - this.costs[row][column] + 1;
		else
			health = Math.min(healthBottom, healthRight) - this.costs[row][column];
		if (health < 1)
			health = 1;
		this.healths[row][column] = health;
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
