const LENGTH_LIMIT = Math.pow(10, 4) - 1;
const FRACTIONAL_DELIMITER = -2,
	PATTERN_BEGINNING = -3,
	PATTERN_ENDING = -4;

function fractionToDecimal(numerator: number, denominator: number): string {
	let result = divide(numerator, denominator);
	result = collapse(result);
	let text = result.map(itemToCharacter).join('');
	if (text.startsWith('.'))
		text = '0' + text;
	return text;
}

function itemToCharacter(item: number): string {
	switch (item) {
		case FRACTIONAL_DELIMITER:
			return '.';
		case PATTERN_BEGINNING:
			return '(';
		case PATTERN_ENDING:
			return ')';
		default:
			return item.toString();
	}
}

function divide(a: number, b: number): number[] {
	if (a === 0)
		return [0];
	let isRemainder = false;
	const result: number[] = [];
	if (a < b) {
		result.push(0, FRACTIONAL_DELIMITER);
		isRemainder = true;
		a *= 10;
	}
	while (a > 0 && result.length < LENGTH_LIMIT) {
		const whole = Math.trunc(a / b);
		const remainder = a - whole * b;
		result.push(whole);
		if (remainder !== 0 && !isRemainder) {
			result.push(FRACTIONAL_DELIMITER);
			isRemainder = true;
		}
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
	++fractionalLength;
	let bestPatternCount = 0;
	let bestPatternLength = 0;
	for (let patternLength = Math.trunc(fractionalLength / 2); patternLength > 0 ; --patternLength) {
		const patternCount = checkPattern(items, patternLength);
		if (bestPatternCount < patternCount) {
			bestPatternCount = patternCount;
			bestPatternLength = patternLength;
		}
	}
	if (bestPatternCount > 1) {
		const patternStartIndex = items.length - bestPatternLength * bestPatternCount;
		const pattern = items.slice(patternStartIndex, patternStartIndex + bestPatternLength);
		items = items.slice(0, patternStartIndex);
		items.push(PATTERN_BEGINNING);
		items.push(...pattern);
		items.push(PATTERN_ENDING);
	}
	return items;
}

/**
 * @returns How many times pattern of specified length repeats in items sequence, starting from the end of the sequence.
 */
function checkPattern(items: number[], length: number): number {
	let patternCount = 0;
	for (let i = 0; i < length; ++i) {
		const baseIndex = items.length - 1 - i;
		const expectedValue = items[baseIndex];
		let currentCount = 0;
		for (let i = baseIndex; i >= 0; i -= length)
			if (items[i] === expectedValue)
				++currentCount;
			else
				break;
		if (patternCount === 0 || currentCount < patternCount)
			patternCount = currentCount;
	}
	return patternCount;
}


// ---

export const fractionToDecimalEx = fractionToDecimal;

if (import.meta.main) {
	console.log(fractionToDecimal(parseInt(Deno.args[0]), parseInt(Deno.args[1])));
}
