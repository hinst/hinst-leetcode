function uniquePaths(m: number, n: number): number {
	if (m < n)
		[m, n] = [n, m];
	return factorial(m + n - 1) / factorial(m) / factorial(n);
}

function factorial(n: number) {
	let result = 1;
	for (let i = 1; i < n; ++i) {
		result *= i;
	}
	return result;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(uniquePaths(3, 7));
}
