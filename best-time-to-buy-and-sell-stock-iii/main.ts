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
		public previous?: SortedItem,
		public next?: SortedItem) {
	}

	toString() {
		let text = '' + this.value + '[' + this.index + ']';
		if (this.next)
			text += ', ' + this.next.toString();
		return text;
	}
}

class SortedIndex {
	head?: SortedItem;
	/** Map<sourceIndex, SortedItem> */
	indexMap = new Map<number, SortedItem>();

	constructor(sources: number[], from: number, to: number) {
		const items: SortedItem[] = [];
		for (let index = from; index < to; ++index) {
			const item = new SortedItem(sources[index], index)
			this.indexMap.set(index, item);
			items.push(item);
		}
		items.sort((a, b) => b.value - a.value);
		let previousItem: SortedItem | undefined;
		for (const item of items) {
			if (previousItem) {
				previousItem.next = item;
				item.previous = previousItem;
			} else {
				this.head = item;
			}
			previousItem = item;
		}
	}

	deleteByIndex(index: number) {
		const item = this.indexMap.get(index);
		if (!item)
			return;
		if (item.previous)
			item.previous.next = item.next;
		if (item === this.head)
			this.head = item.next;
		if (item.next)
			item.next.previous = item.previous;
		this.indexMap.delete(index);
	}
}

function findProfit(prices: number[], from: number, to: number): number {
	let maxProfit = 0;
	if (!prices.length)
		return 0;
	const sortedIndex = new SortedIndex(prices, from, to);
	for (let i = from; i < to; ++i) {
		const currentPrice = prices[i];
		sortedIndex.deleteByIndex(i);
		const nextPrice = sortedIndex.head?.value;
		if (nextPrice === undefined)
			break;
		const profit = nextPrice - currentPrice;
		if (maxProfit < profit)
			maxProfit = profit;
	}
	return maxProfit;
}

export const maxProfitEx = maxProfit;

if (import.meta.main) {
	const prices = [3,3,5,0,0,3,1,4];
	const sortedIndex = new SortedIndex(prices, 0, prices.length);
	console.log(sortedIndex.head?.toString());
	sortedIndex.deleteByIndex(0);
	console.log(sortedIndex.head?.toString());
}
