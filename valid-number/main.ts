const DIGITS = '0123456789';

function isNumberPart(s: string, periodLimit: number): boolean {
	s = s.trim();
	if (s === '')
		return false;
	if (s.startsWith('+') || s.startsWith('-'))
		s = s.slice(1);
	let countOfPeriod = 0;
	let countOfDigits = 0;
	for (const character of s) {
		if (character === '.') {
			++countOfPeriod;
			if (countOfPeriod > periodLimit)
				return false;
		} else if (DIGITS.includes(character)) {
			++countOfDigits;
		} else
			return false;
	}
	return countOfDigits > 0;
}

function isNumber(s: string): boolean {
	s = s.trim();
	if (s === '')
		return false;
	const parts = s.split(new RegExp('[Ee]'));
	if (parts.length > 2)
		return false;
	return isNumberPart(parts[0], 1) &&
		parts.slice(1).every(part => isNumberPart(part, 0));
}

export const isNumberEx = isNumber;

if (import.meta.main) {
	console.log(isNumber('0'));
}
