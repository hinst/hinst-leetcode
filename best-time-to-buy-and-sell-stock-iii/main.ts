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
	console.log(maxProfit(prices));
}
