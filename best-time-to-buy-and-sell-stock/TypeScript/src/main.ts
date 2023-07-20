function getFirstKey(object: any) {
    for (var prop in object)
        return prop;
}

function maxProfit(prices: number[]): number {
    const sortedPricesArray = prices.map((price, index) => [price, index]).sort((a, b) => b[0] - a[0]);
    // price -> indexes
    const sortedPricesMap: Record<string, Record<string, boolean>> = {};
    for (const entry of sortedPricesArray) {
        const price = entry[0];
        const index = entry[1];
        const priceKey = 'p' + price;
        const existingItem = sortedPricesMap[priceKey];
        if (existingItem)
            existingItem[index] = true;
        else {
            const newItem: Record<string, boolean> = {};
            newItem[index] = true;
            sortedPricesMap[priceKey] = newItem;
        }
    }

    let bestProfit = 0;
    prices.forEach((buyingPrice, index) => {
        const bestSellingPrice = parseInt((getFirstKey(sortedPricesMap) || 'p0').slice(1));
        const profit = bestSellingPrice - buyingPrice;
        if (bestProfit < profit)
            bestProfit = profit;
        const priceKey = 'p' + buyingPrice;
        const mapItem = sortedPricesMap[priceKey];
        delete mapItem[index];
        if (getFirstKey(mapItem) === undefined)
            delete sortedPricesMap[priceKey];
    });
    return bestProfit;
};

function test(prices: number[], expectedOutput: number) {
    const output = maxProfit(prices);
    if (output != expectedOutput)
        console.error(prices, output, '!=', expectedOutput);
}

test([7,1,5,3,6,4], 5);
test([7,6,4,3,1], 0);