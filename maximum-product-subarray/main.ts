function maxProduct(nums: number[]): number {
	return new MaxProduct(nums).find() || 0;
}

const LIMIT = 2 * Math.pow(10, 4);

class MaxProduct {
	private readonly calculatedCache = new Map<number, number>();
	private readonly foundCache = new Map<number, number | null>();

	constructor(private readonly items: number[]) {
	}

	find() {
		return this.findNext(0, this.items.length);
	}

	private findNext(from: number, to: number): number | null {
		if (from >= to)
			return null;
		const products = [
			this.calculateCached(from, to),
			this.findNextCached(from, to - 1),
			this.findNextCached(from + 1, to)
		].filter(item => item != null);
		return Math.max(...products);
	}

	private findNextCached(from: number, to: number): number | null {
		if (from >= to)
			return null;
		const key = from + to * LIMIT;
		let cached = this.foundCache.get(key);
		if (cached !== undefined)
			return cached;
		cached = this.findNext(from, to);
		this.foundCache.set(key, cached);
		return cached;
	}

	private calculate(from: number, to: number): number {
		if (to - from === 1)
			return this.items[from];
		else if (to - from === 2)
			return this.items[from] * this.items[from + 1];
		else
			return this.items[from] * this.calculateCached(from + 1, to);
	}

	private calculateCached(from: number, to: number) {
		const key = from + to * LIMIT;
		let cached = this.calculatedCache.get(key);
		if (cached !== undefined)
			return cached;
		cached = this.calculate(from, to);
		this.calculatedCache.set(key, cached);
		return cached;
	}
}


if (import.meta.main) {
	console.log(maxProduct([2,3,-2,4]));
	// console.log(maxProduct([-2,0,-1]));
}
