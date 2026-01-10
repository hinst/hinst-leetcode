const
	STEP_COUNT_LIMIT = 100,
	PRICE_COUNT_LIMIT = 1000,
	PRICE_MAX_LIMIT = 1000;

class LinkedItem {
	previous?: LinkedItem;
	next?: LinkedItem;

	constructor(public readonly value: number) {
	}

	static build(items: number[]): LinkedItem | undefined {
		let head: LinkedItem | undefined = undefined;
		let tail: LinkedItem | undefined = undefined;
		for (const value of items) {
			const item = new LinkedItem(value);
			if (tail) {
				tail.next = item;
				item.previous = tail;
				tail = item;
			} else {
				tail = item;
			}
			if (!head)
				head = tail;
		}
		return head;
	}

	collapse() {
		if (this.previous)
			this.previous.next = this.next;
		if (this.next)
			this.next.previous = this.previous;
	}
}

function buildMaxRight(prices: number[]) {
	const maxRight = new Array(prices.length).fill(0);
	const sortedPrices = prices.map((price, index) => ({price, index})).sort((a, b) => b.price - a.price);
	let headPrice = LinkedItem.build(sortedPrices.map(item => item.price));
	let i = 0;
	const pointers = new Array<LinkedItem>(prices.length).fill(new LinkedItem(0));
	for (let linkedItem = headPrice; linkedItem; linkedItem = linkedItem.next, ++i) {
		pointers[sortedPrices[i].index] = linkedItem;
	}
	for (i = 0; i < prices.length; ++i) {
		maxRight[i] = headPrice?.value || 0;
		const linkedItem = pointers[i];
		if (linkedItem === headPrice && linkedItem) {
			linkedItem.previous = undefined;
			headPrice = linkedItem.next;
		} else {
			linkedItem.collapse();
		}
	}
	return maxRight;
}

class Finder {
	private readonly answerCache = new Map<number, number>();
	private readonly slideCache = new Map<number, number>();
	/** Maximum price to the right of each [index] */
	private readonly maxRight: number[];

	constructor(private readonly prices: number[]) {
		this.maxRight = buildMaxRight(prices);
		console.log(this.maxRight);
	}

	findCached(stepCount: number, beginning: number, ending: number): number {
		const key = this.getKey(stepCount, beginning, ending);
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
			const maxSellingPrice = this.maxRight[i + 1];
			const profit = maxSellingPrice - price;
			if (bestProfit < profit)
				bestProfit = profit;
		}
		return bestProfit;
	}

	private findSlideCached(beginning: number, ending: number): number {
		const key = this.getKey(0, beginning, ending);
		let cachedAnswer = this.slideCache.get(key);
		if (cachedAnswer !== undefined) {
			return cachedAnswer;
		}
		cachedAnswer = this.findSlide(beginning, ending);
		this.slideCache.set(key, cachedAnswer);
		return cachedAnswer;
	}

	private getKey(stepCount: number, beginning: number, ending: number) {
		return stepCount +
			beginning * (STEP_COUNT_LIMIT + 1) +
			ending * (STEP_COUNT_LIMIT + 1) * (PRICE_COUNT_LIMIT + 1);
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
