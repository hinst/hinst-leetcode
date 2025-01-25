const KEYS: string[] = [];
for (let i = 1; i <= 26; ++i)
	KEYS.push(i.toString());

function numDecodings(s: string): number {
	CACHE.clear();
	return decode(s, 0);
}

const CACHE = new Map<number, number>()

function decode(text: string, index: number): number {
	if (index >= text.length)
		return 1;
	let counter = CACHE.get(index);
	if (counter !== undefined)
		return counter;
	else
		counter = 0;
	for (const key of KEYS) {
		if (text.startsWith(key, index))
			counter += decode(text, index + key.length);
	}
	CACHE.set(index, counter);
	return counter;
}

export const numDecodingsEx = numDecodings;

if (import.meta.main) {
	console.log(numDecodings('111111111111111111111111111111111111111111111'));
}
