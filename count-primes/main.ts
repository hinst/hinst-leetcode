function countPrimes(n: number): number {
	if (n <= 2)
		return 0;
	const primes: number[] = [2];
	for (let item = 2; item < n; ++item) {
		let isPrime = true;
		for (const prime of primes)
			if (item % prime === 0) {
				isPrime = false;
				break;
			}
		if (isPrime)
			primes.push(item);
	}
	return primes.length;
}

if (import.meta.main) {
	console.log(countPrimes(10));
	console.log(countPrimes(0));
	console.log(countPrimes(1));
}
