class Dungeon {
	minHealths: number[][];

	constructor(readonly costs: number[][]) {
		this.minHealths = costs.map(row => row.map(_ => Number.MIN_SAFE_INTEGER));
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
		const goBottom = () => {
			if (isBottomAvailable)
				nextHealth.push(this.next(row + 1, column, currentHealth, minHealth));
		};
		const goRight = () => {
			if (isRightAvailable)
				nextHealth.push(this.next(row, column + 1, currentHealth, minHealth));
		};
		if (Math.random() < 0.5) {
			goBottom();
			goRight();
		} else {
			goRight();
			goBottom();
		}
		minHealth = Math.min(minHealth, Math.max(...nextHealth));
		return minHealth;
	}
}

function calculateMinimumHP(dungeon: number[][]): number {
	const d = new Dungeon(dungeon);
	return d.calculate();
}


// ---

export const calculateMinimumHpEx = calculateMinimumHP;

import { dungeon } from "./test41.ts";

if (import.meta.main) {
	const dungeon1 = [[-2,-3,3],[-5,-10,1],[10,30,-5]];
	console.log(calculateMinimumHP(dungeon));
}
