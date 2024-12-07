function uniquePaths(m: number, n: number): number {
	if (m < n)
		[m, n] = [n, m];
	return subFactorial(m + n - 2, m - 1) / factorial(n - 1);
}

function factorial(n: number) {
	let result = 1;
	for (let i = 1; i <= n; ++i)
		result *= i;
	return result;
}

/** @returns (a! / b!) */
function subFactorial(a: number, b: number) {
	let result = 1;
	for (let i = b + 1; i <= a; ++i)
		result *= i;
	return result;
}

if (import.meta.main) {
	console.log(uniquePaths(3, 7));
}
