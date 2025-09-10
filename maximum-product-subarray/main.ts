function maxProduct(nums: number[]): number {
	return new MaxProduct(nums).find();
}

const LIMIT = 2 * Math.pow(10, 4);

class MaxProduct {
	private readonly cache = new Map<number, number>();

	constructor(private readonly items: number[]) {
	}

	find() {
		return this.findCached(0, this.items.length);
	}

	private findCached(from: number, to: number) {
		const key = from + to * LIMIT;
		let cached = this.cache.get(key);
		if (cached !== undefined)
			return cached;
		cached = this.findNext(from, to);
		this.cache.set(key, cached);
		return cached;
	}

	private findNext(from: number, to: number): number {
		if (to - from === 1)
			return this.items[from];
		else if (to - from === 2)
			return this.items[from] * this.items[from + 1];
		else
			return this.items[from] * this.findCached(from + 1, to);
	}
}


if (import.meta.main) {
	console.log(maxProduct([2,3,-2,4]));
}
