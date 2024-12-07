function uniquePaths(m: number, n: number): number {
	if (m < n)
		[m, n] = [n, m];
	return factorial(m + n - 2) / factorial(m - 1) / factorial(n - 1);
}

function factorial(n: number) {
	let result = 1;
	for (let i = 1; i <= n; ++i)
		result *= i;
	return result;
}

if (import.meta.main) {
	console.log(uniquePaths(3, 7));
}
