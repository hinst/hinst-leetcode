const cache = new Map<number, number>();

function jumpCached(numbers: number[], index = 0): number {
	let result = cache.get(index);
	if (result !== undefined)
		return result;
	result = jumpAt(numbers, index);
	cache.set(index, result);
	return result;
}

function jumpAt(numbers: number[], index = 0): number {
	if (index === numbers.length - 1)
		return 0;
	let min = Number.MAX_SAFE_INTEGER;
	for (let i = numbers[index]; i > 0 ; --i) {
		const count = jumpCached(numbers, index + i);
		if (count < min)
			min = count;
		if (min === 0)
			break;
	}
	return 1 + min;
}

function jump(numbers: number[]): number {
	cache.clear();
	return jumpCached(numbers, 0);
}

export const jumpExported = jump;

if (import.meta.main) {
	console.log(jump([2,3,1,1,4]));
}
