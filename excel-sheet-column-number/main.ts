const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LETTERS_MAP = new Map<string, number>();
for (let i = 0; i < LETTERS.length; ++i)
	LETTERS_MAP.set(LETTERS[i], i);

function titleToNumber(columnTitle: string): number {
	let result = 0;
	let multiplier = 1;
	for (let i = columnTitle.length - 1; i >= 0; --i) {
		const character = columnTitle[i];
		const index = LETTERS_MAP.get(character) || 0;
		result += (index + 1) * multiplier;
		multiplier *= LETTERS.length;
	}
	return result;
}

if (import.meta.main) {
	console.log(titleToNumber(Deno.args[0]));
}
