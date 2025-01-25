const LETTER_MAP = new Map<string, string>();
{
	const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let letterIndex = 0;
	for (const letter of LETTERS) {
		++letterIndex;
		LETTER_MAP.set('' + letterIndex, letter);
	}
}

function numDecodings(s: string): number {
	return decode(s, 0);
}

function decode(text: string, index: number): number {
	if (index >= text.length)
		return 1;
	let counter = 0;
	for (const key of LETTER_MAP.keys()) {
		if (text.startsWith(key, index)) {
			counter += decode(text, index + key.length);
		}
	}
	return counter;
}

export const numDecodingsEx = numDecodings;

if (import.meta.main) {
	console.log(numDecodings('12'));
}
