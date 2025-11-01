const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function titleToNumber(columnTitle: string): number {
	let result = 0;
	let multiplier = 1;
	for (let i = columnTitle.length - 1; i >= 0; --i) {
		const character = columnTitle[i];
		const index = LETTERS.indexOf(character);
		result += (index + 1) * multiplier;
		multiplier *= LETTERS.length;
		console.log({character, index, result, multiplier});
	}
	return result;
}

if (import.meta.main) {
	console.log(titleToNumber(Deno.args[0]));
}
