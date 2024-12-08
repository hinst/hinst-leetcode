function plusOne(digits: number[]): number[] {
	let overflow = 1;
	for (let i = digits.length - 1; i >= 0; --i) {
		const sum: number = digits[i] + overflow;
		overflow = sum === 10 ? 1 : 0;
		digits[i] = overflow ? 0 : sum;
		if (overflow === 0)
			break;
	}
	if (overflow)
		digits.unshift(1);
	return digits;
}

if (import.meta.main) {
	console.log(plusOne( [1,2,3] ));
	console.log(plusOne( [1,9] ));
	console.log(plusOne( [9] ));
}
