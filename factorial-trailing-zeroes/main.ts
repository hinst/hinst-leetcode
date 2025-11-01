function getCountOfTrailingZero(n: number) {
	let count = 0;
	while (n > 0) {
		const remainder = n % 10;
		if (remainder === 0)
			++count;
		else
			break;
		n = Math.trunc(n / 10);
	}
	return count;
}

function keepWithZeroes(n: number): number {
	const countOfZero = getCountOfTrailingZero(n);
	return n % Math.pow(10, countOfZero + 4);
}

function trailingZeroes(n: number): number {
	let zeroCount = 0;
	let result = 1;
	for (let i = 1; i <= n; ++i) {
		result *= i;
		result = keepWithZeroes(result);
		const count = getCountOfTrailingZero(result);
		for (let i = 0; i < count; ++i)
			result = Math.trunc(result / 10);
		zeroCount += count;
	}
	return zeroCount;
}


// ---

export const trailingZeroesEx = trailingZeroes;

if (import.meta.main) {
	console.log(trailingZeroes(parseInt(Deno.args[0])));
}
