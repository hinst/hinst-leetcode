const 
	STEP_COUNT_LIMIT = 100,
	PRICE_COUNT_LIMIT = 1000,
	PRICE_LIMIT = 1000;

class Finder {
	private readonly cache = new Map<string, number>();

	constructor(private readonly prices: number[]) {
	}

	findCached(stepCount: number, beginning: number, ending: number): number {
		const key = this.getKey(stepCount, beginning, ending);
		let cachedAnswer = this.cache.get(key);
		if (cachedAnswer !== undefined)
			return cachedAnswer;
		cachedAnswer = this.find(stepCount, beginning, ending);
		this.cache.set(key, cachedAnswer);
		return cachedAnswer;
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
		let bestProfit = 0;
		while (stepCount > 0) {
			if (stepCount === 1) {
				for (let a = beginning; a < ending; ++a)
					for (let b = a; b < ending; ++b) {
						const profit = this.prices[b] - this.prices[a];
						if (bestProfit < profit)
							bestProfit = profit;
					}
			}
			for (let i = beginning + 1; i < ending; ++i) {
				for (let step = 1; step < stepCount; ++step) {
					const profit = this.findCached(step, beginning, i) +
						this.findCached(stepCount - step, i, ending);
					if (bestProfit < profit)
						bestProfit = profit;
				}
			}
			--stepCount;
		}
		return bestProfit;
	}

	private getKey(stepCount: number, beginning: number, ending: number) {
		return stepCount + ';' + beginning + ';' + ending;
	}
}

function maxProfit(k: number, prices: number[]): number {
	const finder = new Finder(prices);
	return finder.find(k, 0, prices.length);
}


export const maxProfitEx = maxProfit;

if (import.meta.main) {
	const k = 2, prices = [1,2,4];
	console.log(maxProfit(k, prices));
}
