const 
	STEP_COUNT_LIMIT = 100,
	PRICE_COUNT_LIMIT = 1000,
	PRICE_LIMIT = 1000;

class Finder {
	constructor(private readonly prices: number[]) {
	}

	find(stepCount: number, beginning: number, ending: number): number {
		if (stepCount <= 0)
			return 0;
		const length = ending - beginning;
		if (length <= 1)
			return 0;
		if (length === 2) {
			const price1 = this.prices[beginning];
			const price2 = this.prices[beginning + 1];
			return price1 < price2 ? price2 - price1 : 0;
		}
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
