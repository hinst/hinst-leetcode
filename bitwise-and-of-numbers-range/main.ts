const BIT_COUNT = 31;

function getBinaryArray(a: number): number[] {
	const result: number[] = new Array(BIT_COUNT);
	for (let i = 0; i < BIT_COUNT; ++i) {
		result[i] = a % 2;
		a = Math.trunc(a / 2);
	}
	return result;
}

function getNumber(items: number[]): number {
	let result = 0;
	let multiplier = 1;
	for (let i = 0; i < items.length; ++i) {
		result += items[i] * multiplier;
		multiplier *= 2;
	}
	return result;
}

function advance(items: number[]): boolean {
	let offset = 0;
	for (; offset < items.length; ++offset) {
		if (items[offset] !== 0)
			break;
	}
	for (let i = offset; i < items.length; ++i) {
		if (items[i] === 0) {
			items[i] = 1;
			return true;
		}
		items[i] = 0;
	}
	return false;
}

function compare(left: number[], right: number[]): number {
	for (let i = left.length - 1; i >= 0; --i) {
		if (left[i] < right[i])
			return -1;
		if (left[i] > right[i])
			return 1;
	}
	return 0;
}

function and(left: number[], right: number[]): number[] {
	const result = new Array(left.length);
	for (let i = 0; i < left.length; ++i) {
		result[i] = left[i] && right[i];
	}
	return result;
}

function rangeBitwiseAnd(left: number, right: number): number {
	const leftArray = getBinaryArray(left);
	let result: number[] = leftArray.slice();
	const rightArray = getBinaryArray(right);
	while (compare(leftArray, rightArray) <= 0) {
		result = and(result, leftArray);
		if (!advance(leftArray))
			break;
	}
	return getNumber(result);
}

if (import.meta.main) {
	let left = 5, right = 7;
	console.log(rangeBitwiseAnd(left, right));
	left = 0, right = 0;
	console.log(rangeBitwiseAnd(left, right));
	left = 1, right = 2147483647;
	console.log(rangeBitwiseAnd(left, right));
}
