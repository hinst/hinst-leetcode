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

function countPrimes(n: number): number {
	if (n <= 2)
		return 0;
	return 0;
}


export const countPrimesExported = countPrimes;

if (import.meta.main) {
	if (true) {
		console.time('generate');
		generate();
		if (false) {
			let count = 0;
			for (let i = 0; i < primes.length; ++i) {
				if (primes[i]) {
					console.log(i);
					++count;
				}
			}
			console.log('[', count, ']');
		}
		console.timeEnd('generate');
	}
	if (false) {
		console.time('countPrimes');
		console.log(countPrimes(LIMIT));
		console.timeEnd('countPrimes');
	}
}
