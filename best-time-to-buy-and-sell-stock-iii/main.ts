const LENGTH_LIMIT = Math.pow(10, 5);

enum Status {
	BEGINNING = 1,
	BOUGHT = 2,
	BEGINNING_2 = 3,
	BOUGHT_2 = 4,
	SOLD_2 = 5
}

function maxProfit(prices: number[]): number {
	return new Finder(prices).search(0, Status.BEGINNING) || 0;
}

function max(a: number | null, b: number | null): number | null {
	if (a === null)
		return b;
	if (b === null)
		return a;
	return Math.max(a, b);
}

class Finder {
	cache = new Map<number, number | null>();

	constructor(readonly prices: number[]) {
	}

	search(index: number, status: Status): number | null {
		const key = status * LENGTH_LIMIT + index;
		let profit = this.cache.get(key);
		if (profit !== undefined)
			return profit;
		profit = this.searchInternal(index, status);
		this.cache.set(key, profit);
		return profit;
	}

	private searchInternal(index: number, status: Status): number | null {
		if (this.prices.length <= index)
			return [Status.BEGINNING, Status.BEGINNING_2].includes(status) ? 0 : null;
		const nextIndex = index + 1;
		switch (status) {
			case Status.BEGINNING: {
				// buy
				const futureProfit = this.search(nextIndex, Status.BOUGHT);
				const profitBuy = futureProfit !== null
					? - this.prices[index] + futureProfit
					: null;
				// skip
				const profitSkip = this.search(nextIndex, status);
				return max(profitBuy, profitSkip);
			}
			case Status.BOUGHT: {
				// sell
				const futureProfit = this.search(nextIndex, Status.BEGINNING_2);
				const profitSell = futureProfit !== null
					? this.prices[index] + futureProfit
					: null;
				// skip
				const profitSkip = this.search(nextIndex, status);
				return max(profitSell, profitSkip);
			}
			case Status.BEGINNING_2: {
				// buy
				const futureProfit = this.search(nextIndex, Status.BOUGHT_2);
				const profitBuy = futureProfit !== null
					? - this.prices[index] + futureProfit
					: 0;
				// skip
				const profitSkip = this.search(nextIndex, status);
				return max(profitBuy, profitSkip);
			}
			case Status.BOUGHT_2: {
				// sell
				const profitSell = this.prices[index];
				// skip
				const futureProfit = this.search(nextIndex, status);
				return max(profitSell, futureProfit);
			}
			case Status.SOLD_2:
				return 0;
		}
	}
}

export const maxProfitEx = maxProfit;

if (import.meta.main) {
	const prices = [1,2,3,4];
	const message = 'prices[' + prices.length + ']';
	console.time(message);
	console.log(maxProfit(prices));
	console.timeEnd(message);
}
