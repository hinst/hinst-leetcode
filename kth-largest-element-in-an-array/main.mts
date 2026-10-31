const LOW = (-1) * Math.pow(10, 4);

function findIndex(array: number[], value: number, a?: number, b?: number): number {
	if (a == null)
		a = 0;
	if (b == null)
		b = array.length - 1;
	if (b <= a)
		return (array[a] || 0) < value ? a + 1 : a;
	const middleIndex = Math.trunc((a + b) / 2);
	const middleValue = array[middleIndex] || 0;
	if (value < middleValue)
		return findIndex(array, value, a, middleIndex - 1);
	if (middleValue < value)
		return findIndex(array, value, middleIndex + 1, b);
	return middleIndex;
}

function insert(array: number[], newItem: number) {
	let index = findIndex(array, newItem);
	if (index !== 0) {
		for (let i = 1; i < index; ++i)
			array[i - 1] = array[i];
		array[index - 1] = newItem;
	}
}

function findKthLargest(inputs: number[], k: number): number {
	let top = new Array(k).fill(LOW);
	for (let i = 0; i < inputs.length; ++i)
		insert(top, inputs[i] || 0);
	return top[0];
}


///---

export const findIndexPublic = findIndex;
export const findKthLargestPublic = findKthLargest;
