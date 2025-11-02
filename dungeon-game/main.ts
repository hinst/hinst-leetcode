class Dungeon {
	constructor(readonly costs: number[][]) {
	}

	calculate(): number {
		return (-1) * this.next(0, 0, 0, 0) + 1;
	}

	private next(row: number, column: number, currentHealth: number, minHealth: number): number {
		const cost = this.costs[row][column];
		currentHealth += cost;
		minHealth = Math.min(minHealth, currentHealth);
		// console.log({row, column, currentCost: currentHealth, minHealth});
		const isBottomAvailable = row < this.costs.length - 1;
		const isRightAvailable = column < this.costs[row].length - 1;
		if (!isBottomAvailable && !isRightAvailable)
			return minHealth;
		const nextHealth: number[] = [];
		if (isBottomAvailable)
			nextHealth.push(this.next(row + 1, column, currentHealth, minHealth));
		if (isRightAvailable)
			nextHealth.push(this.next(row, column + 1, currentHealth, minHealth));
		minHealth = Math.min(minHealth, Math.max(...nextHealth));
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
