function getCountOfZero(n: number) {
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
	const countOfZero = getCountOfZero(n);
	return n % Math.pow(10, countOfZero + 1);
}

function trailingZeroes(n: number): number {
	let result = 1;
	for (let i = 1; i <= n; ++i) {
		result *= i;
		result = keepWithZeroes(result);
	}
	return getCountOfZero(result);
}


// ---

export const trailingZeroesEx = trailingZeroes;

if (import.meta.main) {
	console.log(trailingZeroes(parseInt(Deno.args[0])));
}
