const LIMIT = 5 * 10**6;
const primes: boolean[] = new Array(LIMIT).fill(true);

function generate() {
	primes[0] = false;
	primes[1] = false;
	let prime = 2;
	do {
		for (let i = 2; i < LIMIT; ++i) {
			const composite = prime * i;
			if (composite >= LIMIT)
				break;
			primes[composite] = false;
		}
		let nextPrime = 0;
		for (let i = prime + 1; i < LIMIT; ++i)
			if (primes[i]) {
				nextPrime = i;
				break;
			}
		prime = nextPrime;
	} while (prime);
}

generate();

function countPrimes(n: number): number {
	if (n <= 2)
		return 0;
	let count = 0;
	for (let i = 0; i < n; ++i)
		if (primes[i])
			count++;
	return count;
}


export const countPrimesExported = countPrimes;

if (import.meta.main) {
	console.time('countPrimes');
	console.log(countPrimes(LIMIT));
	console.timeEnd('countPrimes');
}
