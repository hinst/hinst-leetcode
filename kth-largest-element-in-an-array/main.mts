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

	private findInsertionPoint(): HeapNode {
		let current = this.root;
		while (current) {
			if (!current.left)
				return current;
			if (!current.right) {
				const newNode = new HeapNode(0);
				current.right = newNode;
				return newNode;
			}
			current = current.left;
		}
		throw new Error();
	}

	insert(val: number) {
		const newNode = new HeapNode(val);
		if (!this.root)
			this.root = newNode;
		else {
			const parent = this.findInsertionPoint();
			newNode.parent = parent;
			if (!parent.left)
				parent.left = newNode;
			else
				parent.right = newNode;
			this.siftUp(newNode);
		}
		++this.size;
	}

	replaceRoot(val: number) {
		if (this.root) {
			this.root.val = val;
			this.siftDown(this.root);
		}
	}
}

function findKthLargest(inputs: number[], k: number): number {
	const top = new MinHeap();
	for (let i = 0; i < inputs.length; ++i) {
		const input = inputs[i] ?? 0;
		if (top.size < k)
			top.insert(input)
		else if ((top.root?.val ?? 0) < input)
			top.replaceRoot(input);
	}
	return top.root?.val ?? 0;
}


///---

export const findKthLargestPublic = findKthLargest;
