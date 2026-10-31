function findKthLargest(inputs: number[], k: number): number {
	inputs.sort(function(a, b) {
		return b - a;
	});
	return inputs[k - 1] ?? 0;
}


///---

export const findKthLargestPublic = findKthLargest;
