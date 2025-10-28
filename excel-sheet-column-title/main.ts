const LETTERS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function convertToTitle(columnNumber: number): string {
	let result = '';
	while (columnNumber > 0) {
		const index = columnNumber % LETTERS.length;
		result = LETTERS[index] + result;
		columnNumber = Math.trunc(columnNumber / LETTERS.length);
		console.log({columnNumber});
	}
	return result;
}

if (import.meta.main) {
	console.log("'" + convertToTitle(parseInt(Deno.args[0])) + "'");
}
