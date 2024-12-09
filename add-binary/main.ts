function addBinary(a: string, b: string): string {
	const LIMIT = 2;
	const aArray = Array.from(a);
	const bArray = Array.from(b);
	const result: number[] = [];
	let aIndex = aArray.length - 1;
	let bIndex = bArray.length - 1;
	let remainder = 0;
	while (bIndex >= 0 || aIndex >= 0) {
		const a = aArray[aIndex] || '0';
		const b = bArray[bIndex] || '0';
		let sum = parseInt(a) + parseInt(b) + remainder;
		remainder = Math.floor(sum / LIMIT);
		sum = sum % LIMIT;
		result.unshift(sum);
		--bIndex;
		--aIndex;
	}
	if (remainder > 0)
		result.unshift(1);
	return result.join('');
}

if (import.meta.main) {
	const a = "1010", b = "1011";
	console.log(a);
	console.log(b);
	console.log(addBinary(a, b));
}
if (import.meta.main) {
	const a = "11", b = "1";
	console.log(a);
	console.log(b);
	console.log(addBinary(a, b));
}
