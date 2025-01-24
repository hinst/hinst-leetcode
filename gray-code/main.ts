function grayCode(magnitude: number): number[] {
	const numbers = [0, 1];
	for (let i = 1; i < magnitude; ++i) {
		const additional = 1 << i;
		for (let reverseIndex = numbers.length - 1; reverseIndex >= 0; --reverseIndex) {
			const newItem = additional + numbers[reverseIndex];
			numbers.push(newItem);
		}
	}
	return numbers;
}

function toBinary(items: number[]) {
	return items.map(item => item.toString(2)).join('\n');
}

if (import.meta.main) {
	console.log(toBinary(grayCode(3)));
}
