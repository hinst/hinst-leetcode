function rob(houses: number[]): number {
	if (houses.length === 1)
		return houses[0] ?? 0;
	let firstHouseAffected = false;
	const foundCache = new Map<number, number>();

	function find(i: number): number {
		const cachedResult = foundCache.get(i);
		if (cachedResult != null)
			return cachedResult;
		if (i >= houses.length)
			return 0;
		if (i === houses.length - 1)
			return firstHouseAffected ? 0 : (houses[i] ?? 0);
		const sum0 = find(i + 1);
		const sum1 = (houses[i] ?? 0) + find(i + 2);
		const bestSum = Math.max(sum0, sum1);
		foundCache.set(i, bestSum);
		return bestSum;
	}

	const sum1 = find(1);
	firstHouseAffected = true;
	foundCache.clear();
	const sum2 = find(0);
	return Math.max(sum1, sum2);
}

console.log(rob([2,3,2]));
console.log(rob([1,2,3,1]));
console.log(rob([1,2,3]));
