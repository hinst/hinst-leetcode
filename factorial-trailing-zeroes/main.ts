const LIMITER = 100_000;

function trailingZeroes(n: number): number {
	let zeroCount = 0;
	let result = 1;
	for (let i = 1; i <= n; ++i) {
		result *= i;
		while (result % 10 === 0) {
			result = result / 10;
			++zeroCount;
		}
		result = result % LIMITER;
	}
	return zeroCount;
}


// ---

export const trailingZeroesEx = trailingZeroes;

if (import.meta.main) {
	console.log(trailingZeroes(parseInt(Deno.args[0])));
}
