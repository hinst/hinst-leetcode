const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function convertToTitle(columnNumber: number): string {
	if (columnNumber === 1)
		return 'A';
	const items: number[] = [];
	while (columnNumber > 0) {
		--columnNumber;
		const whole = Math.trunc(columnNumber / LETTERS.length);
		const remainder = columnNumber - whole * LETTERS.length;
		items.unshift(remainder);
		columnNumber = whole;
	}
	return items.map(item => LETTERS[item]).join('');
}

if (import.meta.main) {
	console.log("'" + convertToTitle(parseInt(Deno.args[0])) + "'");
}
