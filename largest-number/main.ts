function largestNumber(inputs: number[]): string {
	inputs.sort(compare);
	inputs.reverse();
	let text =  inputs.join('');
	while (text.at(0) === '0' && text.length > 1)
		text = text.substring(1);
	return text;
}

function compare(a: number, b: number) {
	const aText = '' + a + b;
	const bText = '' + b + a;
	if (aText < bText)
		return -1;
	else if (aText > bText)
		return 1;
	else
		return 0;
}

if (import.meta.main) {
	console.log(largestNumber([3,30,34,5,9]));
}
