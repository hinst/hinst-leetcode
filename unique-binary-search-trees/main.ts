function numTrees(n: number): number {
	if (n <= 2)
		return Math.max(1, n);
	let sum = 0;
	for (let i = 0; i < n; ++i)
		sum += numTrees(i) * numTrees(n - i - 1);
	return sum;
}


if (import.meta.main) {
	console.time('computing');
	console.log(numTrees(19));
	console.timeEnd('computing');
}
