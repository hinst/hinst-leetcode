function climbStairs(n: number): number {
	if (n === 1)
		return 1;
	if (n === 2)
		return 2;
	let a = 1;
	let b = 2;
	let result = 0;
	for (let i = 2; i < n; ++i) {
		result = a + b;
		a = b;
		b = result;
	}
	return result;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	for (let i = 1; i <= 10; ++i)
		console.log(climbStairs(i));
}
