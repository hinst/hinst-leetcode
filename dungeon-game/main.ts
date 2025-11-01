class Dungeon {
	constructor(readonly costs: number[][]) {
	}

	calculate(): number {
		return this.next(0, 0, 0, 0);
	}

	private next(row: number, column: number, currentHealth: number, minHealth: number): number {
		const cost = this.costs[row][column];
		currentHealth += cost;
		minHealth = Math.min(currentHealth, minHealth);
		console.log({row, column, currentCost: currentHealth, minHealth});
		return minHealth;
	}
}

function calculateMinimumHP(dungeon: number[][]): number {
	const d = new Dungeon(dungeon);
	return d.calculate();
}


if (import.meta.main) {
	const dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]];
	console.log(calculateMinimumHP(dungeon));
}
