function maxProfit(prices: number[]): number {
	return new Finder(prices).search(0, Status.BEGINNING) || 0;
}

enum Status {
	BEGINNING,
	BOUGHT,
	BEGINNING_2,
	BOUGHT_2,
	SOLD_2
}

function max(a: number | undefined, b: number | undefined): number | undefined {
	if (a === undefined)
		return b;
	if (b === undefined)
		return a;
	return Math.max(a, b);
}

class Finder {
	cache = new Map<number, Map<Status, number | null>>();

	constructor(readonly prices: number[]) {
	}

	search(index: number, status: Status): number | undefined {
		const profit = this.searchInternal(index, status);
		return profit;
	}

	private searchInternal(index: number, status: Status): number | undefined {
		if (this.prices.length <= index)
			return [Status.BEGINNING, Status.BEGINNING_2].includes(status) ? 0 : undefined;
		const nextIndex = index + 1;
		switch (status) {
			case Status.BEGINNING: {
				// buy
				const futureProfit = this.search(nextIndex, Status.BOUGHT);
				const profitBuy = futureProfit !== undefined
					? - this.prices[index] + futureProfit
					: undefined;
				// skip
				const profitSkip = this.search(nextIndex, status);
				return max(profitBuy, profitSkip);
			}
			case Status.BOUGHT: {
				// sell
				const futureProfit = this.search(nextIndex, Status.BEGINNING_2);
				const profitSell = futureProfit !== undefined
					? this.prices[index] + futureProfit
					: undefined;
				// skip
				const profitSkip = this.search(nextIndex, status);
				return max(profitSell, profitSkip);
			}
			case Status.BEGINNING_2: {
				// buy
				const futureProfit = this.search(nextIndex, Status.BOUGHT_2);
				const profitBuy = futureProfit !== undefined
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
