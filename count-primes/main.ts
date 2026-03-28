const primes: number[] = [2];

function findPrimeIndex(start: number, end: number, targetValue: number): number | undefined {
	if (end <= start)
		return undefined;
	const middleIndex = Math.trunc((start + end) / 2);
	const middleValue = primes[middleIndex];
	if (middleValue === targetValue)
		return middleIndex - 1;
	if (middleValue < targetValue && middleIndex < primes.length - 1 && targetValue <= primes[middleIndex + 1])
		return middleIndex;
	const left = findPrimeIndex(start, middleIndex, targetValue);
	if (left !== undefined)
		return left;
	const right = findPrimeIndex(middleIndex + 1, end, targetValue);
	return right;
}

function countPrimes(n: number): number {
	if (n <= 2)
		return 0;
	const primeIndex = findPrimeIndex(0, primes.length, n);
	if (primeIndex !== undefined)
		return primeIndex + 1;
	// console.log(primes[primes.length - 1]);
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


import { writeFileSync } from 'node:fs';

function generate() {
	const LIMIT = 5 * 10**6;
	const primes: number[] = [2];
	for (let i = 3; i <= LIMIT; ++i) {
		let isPrime = true;
		for (const prime of primes)
			if (i % prime === 0) {
				isPrime = false;
				break;
			}
		if (isPrime)
			primes.push(i);
	}
	console.log('primes.length', primes.length);
	writeFileSync('./primes.json', JSON.stringify(primes));
}

export const countPrimesExported = countPrimes;

if (import.meta.main) {
	console.time('generate');
	generate();
	console.timeEnd('generate');

	if (false) {
		console.time('countPrimes');
		console.log(countPrimes(8));
		console.log(countPrimes(3));
		console.timeEnd('countPrimes');
	}
}
