function maxProfit(prices: number[]): number {
	let maxProfit = 0;
	for (let splitIndex = 0; splitIndex < prices.length; ++splitIndex) {
		const leftProfit = findProfit(prices, 0, splitIndex);
		const rightProfit = findProfit(prices, splitIndex, prices.length);
		const totalProfit = leftProfit + rightProfit;
		if (maxProfit < totalProfit)
			maxProfit = totalProfit;
	}
	return maxProfit;
}

class SortedItem {
	constructor(
		public readonly value: number,
		public readonly index: number,
		public nextItem?: SortedItem) {
	}

	toString() {
		let text = '' + this.value + '[' + this.index + ']';
		if (this.nextItem)
			text += ', ' + this.nextItem.toString();
		return text;
	}
}

class SortedIndex {
	head?: SortedItem;
	indexMap = new Map<number, SortedItem>();

	constructor(values: number[]) {
		const items = values.map((value, index) => {
			const item = new SortedItem(value, index)
			this.indexMap.set(index, item);
			return item;
		});
		items.sort((a, b) => b.value - a.value);
		let previousItem: SortedItem | undefined;
		for (const item of items) {
			if (previousItem) {
				previousItem.nextItem = item;
			} else {
				this.head = item;
			}
			previousItem = item;
		}
	}
}

function findProfit(prices: number[], from: number, to: number): number {
	let maxProfit = 0;
	for (let i = from; i < to; ++i) {
		for (let j = i + 1; j < to; ++j) {
			const profit = prices[j] - prices[i];
			if (maxProfit < profit)
				maxProfit = profit;
		}
	}
	return maxProfit;
}

export const maxProfitEx = maxProfit;

if (import.meta.main) {
	const prices = [3,3,5,0,0,3,1,4];
	const sortedIndex = new SortedIndex(prices);
	console.log(sortedIndex.head?.toString());
}
