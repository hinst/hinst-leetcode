class Robber {
	private readonly cache = new Map<number, number>();

	constructor(private readonly treasures: number[]) {
	}

	findCached(index: number) {
		let result = this.cache.get(index);
		if (result != null)
			return result;
		result = this.find(index);
		this.cache.set(index, result);
		return result;
	}

	private find(index: number): number {
		if (index >= this.treasures.length)
			return 0;
		return Math.max(
			this.findCached(index + 1),
			this.treasures[index] + this.findCached(index + 2)
		);
	}
}

function rob(treasures: number[]): number {
	return new Robber(treasures).findCached(0);
}


if (import.meta.main) {
	const treasures = [114,117,207,117,235,82,90,67,143,146,53,108,200,91,80,223,58,170,110,236,81,90,222,160,165,195,187,199,114,235,197,187,69,129,64,214,228,78,188,67,205,94,205,169,241,202,144,240];
	console.time('main');
	console.log(rob(treasures));
	console.timeEnd('main');
}
