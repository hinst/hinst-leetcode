function maxProfit(prices: number[]): number {
	let profit = 0;
	if (!prices.length)
		return profit;
	let previousPrice = prices[prices.length - 1];
	for (let i = prices.length - 2; 0 <= i; --i) {
		const currentPrice = prices[i];
		if (currentPrice < previousPrice)
			profit += previousPrice - currentPrice;
		previousPrice = currentPrice;
	}
	return profit;
}

if (import.meta.main) {
	const prices = [7,6,4,3,1];
	console.log(maxProfit(prices));
}
