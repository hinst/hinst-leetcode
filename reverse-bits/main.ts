function reverseBits(n: number): number {
	const bits: number[] = [];
	while (n > 0) {
		const bit = n % 2;
		bits.unshift(bit);
		n = Math.trunc(n / 2);
	}
	console.log(bits.join(''));
}

if (import.meta.main) {
	reverseBits(43261596);
}
