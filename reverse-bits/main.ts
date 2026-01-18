function reverseBits(n: number): number {
	const length = 32;
	const bits: number[] = new Array(length);
	for (let i = 0; i < length; ++i) {
		const bit = n % 2;
		bits[i] = bit;
		n = Math.trunc(n / 2);
	}
	return parseInt(bits.join(''), 2);
}

if (import.meta.main) {
	console.log(reverseBits(43261596));
}
