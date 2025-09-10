function maxProduct(nums: number[]): number {
	return new MaxProduct(nums).find() || 0;
}

const LIMIT = 2 * Math.pow(10, 4);

class MaxProduct {
	private readonly cache = new Map<number, number>();

	constructor(private readonly items: number[]) {
	}

	find() {
		return this.findNext(0, this.items.length);
	}

	findNext(from: number, to: number): number | undefined {
		if (from >= to)
			return undefined;
		const products = [
			this.calculateCached(from, to),
			this.findNext(from, to - 1),
			this.findNext(from + 1, to)
		].filter(item => item !== undefined);
		return Math.max(...products);
	}

	private calculateCached(from: number, to: number) {
		const key = from + to * LIMIT;
		let cached = this.cache.get(key);
		if (cached !== undefined)
			return cached;
		cached = this.calculate(from, to);
		this.cache.set(key, cached);
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
}


if (import.meta.main) {
	// console.log(maxProduct([2,3,-2,4]));
	console.log(maxProduct([-2,0,-1]));
}
