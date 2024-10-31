function permuteUnique(numbers: number[], index = 0, results: number[][] = []): number[][] {
	if (index === numbers.length)
		results.push(numbers.slice());
	for (let i = index; i < numbers.length; ++i) {
		if (checkSwap(numbers, index, i)) {
			swap(numbers, index, i);
			permuteUnique(numbers, index + 1, results);
			swap(numbers, index, i);
		}
	}
	return results;
}

function checkSwap(numbers: number[], a: number, b: number) {
	for (let i = a; i < b; ++i)
		if (numbers[i] === numbers[b])
			return false;
	return true;
}

function swap(numbers: number[], a: number, b: number) {
	if (a === b)
		return;
	const buffer = numbers[a];
	numbers[a] = numbers[b];
	numbers[b] = buffer;
}

export const permuteExported = permuteUnique;

if (import.meta.main) {
	console.log(permuteUnique([1,1,2]));
}
