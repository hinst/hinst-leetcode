const primes: number[] = [2];

function countPrimes(n: number): number {
	if (n <= 2)
		return 0;
	for (let i = 0; i < primes.length; ++i) {
		if (n <= primes[i]) {
			console.log(primes.slice(0, i), n);
			return i;
		}
	}
	for (let counter = primes[primes.length - 1] + 1; counter < n; counter += 2) {
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
	console.log(primes, n);
	return primes.length;
}

export const countPrimesExported = countPrimes;

if (import.meta.main) {
	console.time('countPrimes');
	console.log(countPrimes(10));
	console.log(countPrimes(13));
	console.timeEnd('countPrimes');
}
