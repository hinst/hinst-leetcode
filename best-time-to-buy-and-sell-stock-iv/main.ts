const 
	STEP_COUNT_LIMIT = 100,
	PRICE_COUNT_LIMIT = 1000,
	PRICE_LIMIT = 1000;

class Finder {
	constructor(private readonly prices: number[]) {
	}

	find(depth: number, stepCount: number, beginning: number, ending: number): number {
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
		if (stepCount === 1) {
			let maxPrice = 0;
			let minPrice = PRICE_LIMIT;
			for (let i = beginning; i < ending; ++i) {
				const price = this.prices[i];
				if (price < minPrice)
					minPrice = price;
				if (maxPrice < price)
					maxPrice = price;
			}
			console.log('.'.repeat(depth), {beginning, ending, stepCount, minPrice, maxPrice});
			return minPrice < maxPrice ? maxPrice - minPrice : 0;
		}
		let bestProfit = 0;
		for (let i = beginning + 1; i < ending - 1; ++i) {
			for (let step = 1; step < stepCount; ++step) {
				const profit = this.find(depth + 1, step, beginning, i) + this.find(depth + 1, stepCount - step, i, ending);
				if (bestProfit < profit)
					bestProfit = profit;
			}
		}
		console.log(':'.repeat(depth), {beginning, ending, stepCount, bestProfit});
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
