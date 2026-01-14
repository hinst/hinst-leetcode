const
	TRANSACTION_COUNT_LIMIT = 100,
	PRICE_COUNT_LIMIT = 1000,
	PRICE_MAX_LIMIT = 1000;

class Finder {
	private readonly answerCache = new Map<number, number>();

	constructor(private readonly prices: number[]) {
	}

	findCached(dayIndex: number, remainingTransactions: number, isHolding: number): number {
		const key = this.getAnswerKey(dayIndex, remainingTransactions, isHolding);
		let cachedAnswer = this.answerCache.get(key);
		if (cachedAnswer !== undefined)
			return cachedAnswer;
		cachedAnswer = this.find(dayIndex, remainingTransactions, isHolding);
		this.answerCache.set(key, cachedAnswer);
		return cachedAnswer;
	}

	private find(dayIndex: number, remainingTransactions: number, isHolding: number): number {
		if (dayIndex >= this.prices.length || remainingTransactions <= 0)
			return 0;
		const idleProfit = this.findCached(dayIndex + 1, remainingTransactions, isHolding);
		const invertedHolding = isHolding ? 0 : 1;
		const actProfit = isHolding
			? this.prices[dayIndex] + this.findCached(dayIndex + 1, remainingTransactions - 1, invertedHolding)
			: - this.prices[dayIndex] + this.findCached(dayIndex + 1, remainingTransactions, invertedHolding);
		return Math.max(idleProfit, actProfit);
	}

	private getAnswerKey(dayIndex: number, remainingTransactions: number, isHolding: number): number {
		return dayIndex +
			(PRICE_COUNT_LIMIT + 1) * remainingTransactions +
			(PRICE_COUNT_LIMIT + 1) * (TRANSACTION_COUNT_LIMIT + 1) * isHolding;
	}
}

function maxProfit(k: number, prices: number[]): number {
	const finder = new Finder(prices);
	return finder.findCached(0, k, 0);
}


export const maxProfitEx = maxProfit;

if (import.meta.main) {
	const k = 2, prices = [2,4,1];
	console.log('prices.length:', prices.length);
	console.time('maxProfit');
	console.log(maxProfit(k, prices));
	console.timeEnd('maxProfit');
}
