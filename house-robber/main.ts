class Robber {
	constructor(private readonly treasures: number[]) {
	}

	find(index: number): number {
		if (index >= this.treasures.length)
			return 0;
		return Math.max(
			this.find(index + 1),
			this.treasures[index] + this.find(index + 2)
		);
	}
}

function rob(treasures: number[]): number {
	return new Robber(treasures).find(0);
}


if (import.meta.main) {
	console.log(rob([1,2,3,1]));
}
