const primes: number[] = [2];

function countPrimes(n: number): number {
	if (n <= 2)
		return 0;
	for (let i = 0; i < primes.length; ++i) {
		if (n <= primes[i]) {
			return i;
		}
	}
	console.log(primes[primes.length - 1]);
	for (let counter = primes[primes.length - 1] + 1; counter < n; ++counter) {
		let isPrime = true;
		const half = counter / 2;
		for (const prime of primes) {
			if (counter % prime === 0) {
				isPrime = false;
				break;
			}
			if (half < prime)
				break;
		}
		if (isPrime)
			primes.push(counter);
	}
	return primes.length;
}

export const countPrimesExported = countPrimes;

if (import.meta.main) {
	console.time('countPrimes');
	console.log(countPrimes(8));
	console.log(countPrimes(12));
	console.timeEnd('countPrimes');
}
