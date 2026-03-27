function countPrimes(n: number): number {
	if (n <= 2)
		return 0;
	const primes: number[] = [2];
	for (let item = 3; item < n; item += 2) {
		let isPrime = true;
		const half = item / 2;
		for (const prime of primes) {
			if (item % prime === 0) {
				isPrime = false;
				break;
			}
			if (half < prime)
				break;
		}
		if (isPrime)
			primes.push(item);
	}
	return primes.length;
}

if (import.meta.main) {
	console.time('countPrimes');
	console.log(countPrimes(999983));
	console.timeEnd('countPrimes');
}
