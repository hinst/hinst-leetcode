const 
	STEP_COUNT_LIMIT = 100,
	PRICE_COUNT_LIMIT = 1000,
	PRICE_LIMIT = 1000;

class Finder {
	constructor(private readonly prices: number[]) {
	}

	find(depth: number, stepCount: number, beginning: number, ending: number): number {
		console.log('.'.repeat(depth), {stepCount,beginning,ending});
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
		let bestProfit = 0;
		if (stepCount === 1) {
			for (let a = beginning; a < ending; ++a)
				for (let b = a; b < ending; ++b) {
					const profit = this.prices[b] - this.prices[a];
					if (bestProfit < profit)
						bestProfit = profit;
				}
			return bestProfit;
		}
		for (let i = beginning + 1; i < ending; ++i) {
			for (let step = 1; step < stepCount; ++step) {
				const profit = this.find(depth + 1, step, beginning, i) + this.find(depth + 1, stepCount - step, i, ending);
				if (bestProfit < profit)
					bestProfit = profit;
			}
		}
		return bestProfit;
	}
}

function maxProfit(k: number, prices: number[]): number {
	const finder = new Finder(prices);
	return finder.find(0, k, 0, prices.length);
}

if (import.meta.main) {
	const k = 2, prices = [3,2,6,5,0,3];
	console.log(maxProfit(k, prices));
}
