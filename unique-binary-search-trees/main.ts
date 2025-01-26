/** Definition for a binary tree node */
class TreeNode {
	val: number
	left: TreeNode | null
	right: TreeNode | null
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = (val===undefined ? 0 : val)
		this.left = (left===undefined ? null : left)
		this.right = (right===undefined ? null : right)
	}
}


type CounterWrapper = { counter: number };

function numTrees(n: number): number {
	const variety = { counter: 0 };
	const root = new TreeNode(n);
	build([root], n - 1, variety);
	return variety.counter;
}

function build(nodes: TreeNode[], remainingNodeCount: number, variety: CounterWrapper) {
	if (remainingNodeCount <= 0) {
		variety.counter += 1;
		return;
	}
	const counter: number[] = new Array(nodes.length).fill(0);
	do {
		let n = remainingNodeCount;
		const nextNodes: TreeNode[] = [];
		for (let i = 0; i < nodes.length; ++i) {
			if (counter[i] === 0) {
				nodes[i].left = null;
				nodes[i].right = null;
			} else if (counter[i] === 1) {
				const left = new TreeNode(n);
				nodes[i].left = left;
				nextNodes.push(left);
				nodes[i].right = null;
				--n;
			} else if (counter[i] === 2) {
				nodes[i].left = null;
				const right = new TreeNode(n);
				nodes[i].right = right;
				nextNodes.push(right);
				--n;
			} else if (counter[i] === 3) {
				const left = new TreeNode(n);
				nodes[i].left = left;
				nextNodes.push(left);
				--n;
				const right = new TreeNode(n);
				nodes[i].right = right;
				nextNodes.push(right);
				--n;
			}
		}
		if (0 <= n && n < remainingNodeCount)
			build(nextNodes, n, variety);
	} while (next(counter));
}

/** @returns true if further counting is possible */
function next(counter: number[]): boolean {
	let additional = 1;
	for (let i = 0; i < counter.length; ++i) {
		if (counter[i] < 3) {
			counter[i] += 1;
			additional = 0;
			break;
		} else
			counter[i] = 0;
	}
	return 0 === additional;
}


if (import.meta.main) {
	console.log(numTrees(3));
}
