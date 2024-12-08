const UPPER_CASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE_LETTERS = UPPER_CASE_LETTERS.toLowerCase();
const DIGITS = '0123456789';

function isNumber(s: string): boolean {
	s = s.trim();
	if (s.endsWith('e'))
		return false;
	if (new RegExp('\\.\\d+\\.').test(s))
		// numbers surrounded by period on both sides are not allowed
		return false;
	const characters = Array.from(s);
	for (let i = 0; i < characters.length; ++i) {
		const previous = characters[i - 1];
		const c = characters[i];
		const next = characters[i + 1];
		if (UPPER_CASE_LETTERS.includes(c) && c != 'E')
			return false;
		if (LOWER_CASE_LETTERS.includes(c) && c != 'e')
			return false;
		if (c === '.') {
			const haveDigit = DIGITS.includes(previous) || DIGITS.includes(next);
			if (!haveDigit)
				return false;
		}
	}
	return !Number.isNaN(parseFloat(s));
}

if (import.meta.main) {
	console.log(isNumber('0'));
}
