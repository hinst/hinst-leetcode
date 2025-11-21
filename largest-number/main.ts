function largestNumber(inputs: number[]): string {
	const items = inputs.map(item => '' + item);
	items.sort(compareExtended);
	console.log(items);
	items.reverse();
	return items.join('');
}

function compare(a: string, b: string) {
	return a < b
		? -1
		: a > b
			? 1
			: 0;
}

function compareExtended(a: string, b: string) {
	if (a.startsWith(b) && a.length > b.length)
		return -1;
	if (b.startsWith(a) && b.length > a.length)
		return 1;
	return compare(a, b);
}

if (import.meta.main) {
	console.log(largestNumber([3,30,34,5,9]));
}
