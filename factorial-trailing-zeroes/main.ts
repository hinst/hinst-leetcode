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

function trailingZeroes(n: number): number {
	let result = 1;
	for (let i = 1; i <= n; ++i) {
		result *= i;
	}
	return getCountOfZero(result);
}

if (import.meta.main) {
	console.log(trailingZeroes(parseInt(Deno.args[0])));
}
