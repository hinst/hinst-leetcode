import { formatMatrix } from '../array.ts';

class Dungeon {
	private readonly minHealths: number[][] = [];

	constructor(readonly costs: number[][]) {
		for (let row = 0; row < costs.length; ++row)
			this.minHealths.push(new Array(costs[row].length));
	}

	calculate(): number {
		this.rewind(this.costs.length - 1, this.costs[0].length - 1, 0);
		console.log(formatMatrix(this.costs));
		console.log();
		console.log(formatMatrix(this.minHealths));
		return 0;
	}

	private rewind(row: number, column: number, health: number) {
		health += this.costs[row][column];
		this.minHealths[row][column] = health;
		if (row > 0)
			this.rewind(row - 1, column, health);
		if (column > 0)
			this.rewind(row, column - 1, health);
	}
}

function calculateMinimumHP(dungeon: number[][]): number {
	const d = new Dungeon(dungeon);
	return d.calculate();
}


// ---

import { dungeon } from "./test41.ts";

if (import.meta.main) {
	const dungeon1 = [[-2,-3,3],[-5,-10,1],[10,30,-5]];
	console.log(calculateMinimumHP(dungeon1));
}
