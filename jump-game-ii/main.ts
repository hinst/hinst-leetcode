function jump(numbers: number[], index = 0, depth = 0): number {
	// console.log({depth, index});
	// console.log(numbers.join(''));
	// console.log(' '.repeat(index) + '^');
	if (index === numbers.length - 1)
		return 0;
	let min = Number.MAX_SAFE_INTEGER;
	for (let i = 1; i <= numbers[index]; ++i) {
		const count = jump(numbers, index + i, depth + 1);
		if (count < min)
			min = count;
		if (min === 0)
			break;
	}
	return 1 + min;
}

export const jumpExported = jump;

if (import.meta.main) {
	console.log(jump([2,3,1,1,4]));
}
