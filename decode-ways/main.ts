const KEYS: string[] = [];
{
	const LETTER_MAP = new Map<string, string>();
	const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let letterIndex = 0;
	for (const letter of LETTERS) {
		++letterIndex;
		LETTER_MAP.set('' + letterIndex, letter);
		KEYS.push('' + letterIndex);
	}
}

function numDecodings(s: string): number {
	const cache = new Map<number, number>();
	return decode(cache, s, 0);
}

function decode(cache: Map<number, number>, text: string, index: number): number {
	if (index >= text.length)
		return 1;
	let counter = 0;
	for (const key of KEYS) {
		if (text.startsWith(key, index)) {
			const newIndex = index + key.length;
			let count = cache.get(newIndex);
			if (count === undefined) {
				count = decode(cache, text, newIndex);
				cache.set(newIndex, count);
			}
			counter += count;
		}
	}
	return counter;
}

export const numDecodingsEx = numDecodings;

if (import.meta.main) {
	console.log(numDecodings('111111111111111111111111111111111111111111111'));
}
