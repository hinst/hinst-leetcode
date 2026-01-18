function hammingWeight(n: number): number {
	const length = 32;
	let count = 0;
	for (let i = 0; i < length; ++i) {
		const bit = n % 2;
		if (bit)
			++count;
		n = Math.trunc(n / 2);
	}
	return count;
}

if (import.meta.main) {
	console.log(hammingWeight(11));
}
