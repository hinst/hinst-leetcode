function maxProfit(prices: number[]): number {
	let maxProfit = 0;
	for (let splitIndex = 0; splitIndex < prices.length; ++splitIndex) {
		const left = prices.slice(0, splitIndex);
		const right = prices.slice(splitIndex);
		const leftProfit = findProfit(left);
		const rightProfit = findProfit(right);
		const totalProfit = leftProfit + rightProfit;
		if (maxProfit < totalProfit)
			maxProfit = totalProfit;
	}
	return maxProfit;
}

function findProfit(prices: number[]): number {
	let maxProfit = 0;
	for (let i = 0; i < prices.length; ++i) {
		for (let j = i + 1; j < prices.length; ++j) {
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
