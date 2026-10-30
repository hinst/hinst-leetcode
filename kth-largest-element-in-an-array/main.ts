const LOW = (-1) * Math.pow(10, 4);

function insert(array: number[], newItem: number) {
	let index = 0;
	while (index < array.length && (array[index] || 0) < newItem)
		++index;
	if (index === 0)
		return;
	for (let i = 1; i < index; ++i)
		array[i - 1] = array[i] || 0;
	array[index - 1] = newItem;
}

function findKthLargest(inputs: number[], k: number): number {
	const top = new Array(k).fill(LOW);
	for (let i = 0; i < inputs.length; ++i) {
		insert(top, inputs[i] || 0);
	}
	return top[0];
}


let nums = [3,2,1,5,6,4], k = 2;
console.log(findKthLargest(nums, k));

nums = [3,2,3,1,2,4,5,5,6], k = 4;
console.log(findKthLargest(nums, k));