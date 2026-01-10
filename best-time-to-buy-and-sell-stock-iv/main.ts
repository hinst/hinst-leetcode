const
	STEP_COUNT_LIMIT = 100,
	PRICE_COUNT_LIMIT = 1000,
	PRICE_MAX_LIMIT = 1000;

class Finder {
	private readonly answerCache = new Map<number, number>();
	private readonly slideCache = new Map<number, number>();
	/** Maximum price to the right of each [index] */
	private readonly maxCache = new Map<number, number>();

	constructor(private readonly prices: number[]) {
	}

	findCached(stepCount: number, beginning: number, ending: number): number {
		const key = this.getAnswerKey(stepCount, beginning, ending);
		let cachedAnswer = this.answerCache.get(key);
		if (cachedAnswer !== undefined)
			return cachedAnswer;
		cachedAnswer = this.find(stepCount, beginning, ending);
		this.answerCache.set(key, cachedAnswer);
		return cachedAnswer;
	}

	private find(stepCount: number, beginning: number, ending: number): number {
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
		let bestProfit = this.findSlideCached(beginning, ending);
		for (let i = beginning + 1; i < ending; ++i) {
			for (let leftSteps = 1; leftSteps < stepCount; ++leftSteps) {
				const rightSteps = stepCount - leftSteps;
				const profit = this.findCached(leftSteps, beginning, i) +
					this.findCached(rightSteps, i, ending);
				if (bestProfit < profit)
					bestProfit = profit;
			}
		}
		return bestProfit;
	}

	private findSlide(beginning: number, ending: number): number {
		const limit = ending - 1;
		let bestProfit = 0;
		for (let i = beginning; i < limit; ++i) {
			const price = this.prices[i];
			const maxSellingPrice = this.findMaxCached(beginning + 1, ending);
			const profit = maxSellingPrice - price;
			if (bestProfit < profit)
				bestProfit = profit;
		}
		return bestProfit;
	}

	private findSlideCached(beginning: number, ending: number): number {
		const key = this.getRangeKey(beginning, ending);
		let cachedAnswer = this.slideCache.get(key);
		if (cachedAnswer !== undefined) {
			return cachedAnswer;
		}
		cachedAnswer = this.findSlide(beginning, ending);
		this.slideCache.set(key, cachedAnswer);
		return cachedAnswer;
	}

	private findMax(beginning: number, ending: number): number {
		let max = 0;
		for (let i = beginning; i < ending; ++i)
			if (max < this.prices[i])
				max = this.prices[i];
		return max;
	}

	private findMaxCached(beginning: number, ending: number): number {
		const key = this.getRangeKey(beginning, ending);
		let cachedValue = this.maxCache.get(key);
		if (cachedValue !== undefined)
			return cachedValue;
		cachedValue = this.findMax(beginning, ending);
		this.maxCache.set(key, cachedValue);
		return cachedValue;
	}

	private getAnswerKey(stepCount: number, beginning: number, ending: number) {
		return stepCount +
			beginning * (STEP_COUNT_LIMIT + 1) +
			ending * (STEP_COUNT_LIMIT + 1) * (PRICE_COUNT_LIMIT + 1);
	}

	private getRangeKey(beginning: number, ending: number) {
		return beginning + ending * (PRICE_COUNT_LIMIT + 1);
	}
}

function maxProfit(k: number, prices: number[]): number {
	const finder = new Finder(prices);
	return finder.findCached(k, 0, prices.length);
}


export const maxProfitEx = maxProfit;

if (import.meta.main) {
	const k = 2, prices = [6,1,3,2,4,7];
	console.log('prices.length:', prices.length);
	console.time('maxProfit');
	console.log(maxProfit(k, prices));
	console.timeEnd('maxProfit');
}
