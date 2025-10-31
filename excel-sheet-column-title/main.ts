const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class Counter {
	items: number[] = [0];
	next() {
		let done = false;
		for (let i = this.items.length - 1; i >= 0; --i) {
			++this.items[i];
			if (this.items[i] < LETTERS.length) {
				done = true;
				break;
			} else
				this.items[i] = 0;
		}
		if (!done)
			this.items.unshift(0);
	}

	toString() {
		return this.items.map(item => LETTERS[item]).join('');
	}
}

function convertToTitle(columnNumber: number): string {
	const counter = new Counter();
	for (let i = 1; i < columnNumber; ++i)
		counter.next();
	return counter.toString();
}

if (import.meta.main) {
	console.log("'" + convertToTitle(parseInt(Deno.args[0])) + "'");
}
