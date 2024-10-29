function permute(numbers: number[], index = 0, results: number[][] = []): number[][] {
	if (index === numbers.length)
		results.push(numbers.slice());
	for (let i = index; i < numbers.length; ++i) {
		swap(numbers, index, i);
		permute(numbers, index + 1, results);
		swap(numbers, index, i);
	}
	return results;
}

function swap(numbers: number[], a: number, b: number) {
	if (a === b)
		return;
	const buffer = numbers[a];
	numbers[a] = numbers[b];
	numbers[b] = buffer;
}

export const permuteExported = permute;

if (import.meta.main) {
	console.log(permute([1,2,3]));
}
