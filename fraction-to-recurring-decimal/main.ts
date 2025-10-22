const LENGTH_LIMIT = Math.pow(10, 4);
const FRACTIONAL_DELIMITER = -2;

function fractionToDecimal(numerator: number, denominator: number): string {
	let result = divide(numerator, denominator);
	result = collapse(result);
	let text = result
		.map(item => item === FRACTIONAL_DELIMITER ? '.' : item.toString())
		.join('');
	if (text.startsWith('.'))
		text = '0' + text;
	return text;
}

function divide(a: number, b: number): number[] {
	let haveZero = false;
	const result: number[] = [];
	while (a > 0 && result.length < LENGTH_LIMIT) {
		if (a < b) {
			result.push(haveZero ? 0 : FRACTIONAL_DELIMITER);
			haveZero = true;
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

function collapse(items: number[]): number[] {
	if (items.length < LENGTH_LIMIT)
		return items;
	let fractionalLength = -1;
	for (const item of items) {
		if (item === FRACTIONAL_DELIMITER || fractionalLength >= 0)
			fractionalLength++;
	}
	fractionalLength = Math.min(0, fractionalLength);
	for (let repeatingLength = fractionalLength / 2; repeatingLength > 0 ; --repeatingLength) {
	}
	return items;
}

if (import.meta.main) {
	console.log(fractionToDecimal(10, 55));
}
