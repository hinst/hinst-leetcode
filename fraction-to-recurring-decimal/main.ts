function fractionToDecimal(numerator: number, denominator: number): string {
	let result = divide(numerator, denominator).join('');
	if (result.length > 1)
		result = result[0] + '.' + result.substring(1);
	return result;
}

const LENGTH_LIMIT = Math.pow(10, 4);

function divide(a: number, b: number): number[] {
	const result: number[] = [];
	while (a > 0 && result.length < LENGTH_LIMIT) {
		if (a < b) {
			result.push(0);
			a *= 10;
			continue;
		}
		const whole = Math.trunc(a / b);
		const remainder = a - whole * b;
		result.push(whole);
		a = remainder * 10;
	}
	return result;
}

if (import.meta.main) {
	console.log(fractionToDecimal(4, 333));
}
