class Finder {
	constructor(private readonly prices: number[]) {
	}

	find(stepCount: number, beginning: number, ending: number): number {
	}
}

function maxProfit(k: number, prices: number[]): number {
	const finder = new Finder(prices);
	return finder.find(k, 0, prices.length);
}

if (import.meta.main) {
	const k = 2, prices = [3,2,6,5,0,3];
	console.log(maxProfit(k, prices));
}
