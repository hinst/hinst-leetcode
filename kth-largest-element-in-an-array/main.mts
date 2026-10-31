class HeapNode {
	constructor (public val: number) {
	}
	left?: HeapNode;
	right?: HeapNode;
	parent?: HeapNode;
}

class MinHeap {
	root?: HeapNode;
	size = 0;

    // When you add a node to the bottom, it bubbles up until parent is smaller
	private siftUp(node: HeapNode) {
		while (node.parent && node.val < node.parent.val) {
			[node.val, node.parent.val] = [node.parent.val, node.val];
			node = node.parent;
		}
	}

	// When you replace the root, it sinks down until it is smaller than children
	private siftDown(node: HeapNode) {
		while (true) {
			let smallest = node;
			if (node.left && node.left.val < smallest.val)
				smallest = node.left;
			if (node.right && node.right.val < smallest.val)
				smallest = node.right;
			if (smallest !== node) {
				[node.val, smallest.val] = [smallest.val, node.val];
				node = smallest;
			} else
				break;
		}
	}

	insert(val: number) {
		const newNode = new HeapNode(val);
		if (!this.root)
			this.root = newNode;
		else
			this.siftUp(newNode);
		++this.size;
	}

	replaceRoot(val: number) {
		if (this.root) {
			this.root.val = val;
			this.siftDown(this.root);
		}
	}
}

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
