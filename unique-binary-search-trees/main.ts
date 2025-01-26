const cache = new Map<number, number>();

function numTrees(n: number): number {
	if (n <= 2)
		return Math.max(1, n);
	let sum = cache.get(n);
	if (sum !== undefined)
		return sum;
	else
		sum = 0;
	for (let i = 0; i < n; ++i)
		sum += numTrees(i) * numTrees(n - i - 1);
	cache.set(n, sum);
	return sum;
}


if (import.meta.main) {
	console.time('computing');
	console.log(numTrees(19));
	console.timeEnd('computing');
}
