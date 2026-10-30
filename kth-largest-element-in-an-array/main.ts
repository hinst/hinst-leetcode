const LOW = (-1) * Math.pow(10, 4);

class Node {
	constructor(readonly value: number, public next: Node?) {
	}
}

class TopItems {
	head: Node;

	insert(newValue: number) {
	}
}

function insert(array: number[], newItem: number): number[] {
	let index = 0;
	while (index < array.length && (array[index] || 0) < newItem)
		++index;
	if (index === 0)
		return array;
	return array.slice(1, index).concat([newItem], array.slice(index, array.length));
}

function findKthLargest(inputs: number[], k: number): number {
	let top = new Array(k).fill(LOW);
	for (let i = 0; i < inputs.length; ++i)
		top = insert(top, inputs[i] || 0);
	return top[0];
}


let nums = [3,2,1,5,6,4], k = 2;
console.log(findKthLargest(nums, k));

nums = [3,2,3,1,2,4,5,5,6], k = 4;
console.log(findKthLargest(nums, k));