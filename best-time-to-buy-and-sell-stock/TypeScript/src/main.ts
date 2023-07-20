function getFirstKey(object: any) {
    for (var prop in object)
        return prop;
}

function maxProfit(prices: number[]): number {
    const sortedPricesArray = prices.map((price, index) => [price, index]).sort((a, b) => b[0] - a[0]);
    // price -> indexes
    const sortedPricesMap = new Map<number, Set<number>>();
    for (const entry of sortedPricesArray) {
        const price = entry[0];
        const index = entry[1];
        const existingIndexList = sortedPricesMap.get(price);
        if (existingIndexList)
            existingIndexList.add(index);
        else {
            const newIndexList = new Set<number>();
            newIndexList.add(index);
            sortedPricesMap.set(price, newIndexList);
        }
    }

    let bestProfit = 0;
    prices.forEach((buyingPrice, index) => {
        const bestSellingPrice: number = sortedPricesMap.entries().next().value[0];
        const profit = bestSellingPrice - buyingPrice;
        if (bestProfit < profit)
            bestProfit = profit;
        const mapItem = sortedPricesMap.get(buyingPrice);
        mapItem?.delete(index);
        if (mapItem && mapItem.size === 0)
            sortedPricesMap.delete(buyingPrice);
    });
    return bestProfit;
}

function test(prices: number[], expectedOutput: number) {
    const output = maxProfit(prices);
    if (output != expectedOutput)
        console.error(prices, output, '!=', expectedOutput);
}

test([7,1,5,3,6,4], 5);
test([7,6,4,3,1], 0);