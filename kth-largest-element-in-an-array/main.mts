function insert(array: number[], newItem: number, limit: number) {
	array.unshift(newItem);
	array.sort(function(a, b) {
		return a - b;
	});
	while (array.length > limit)
		array.shift();
}

function findKthLargest(inputs: number[], k: number): number {
	let top = new Array<number>();
	for (let i = 0; i < inputs.length; ++i)
		insert(top, inputs[i] || 0, k);
	return top[0] || 0;
}


///---

export const findKthLargestPublic = findKthLargest;
