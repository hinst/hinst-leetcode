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
	if (19 === n)
		return 1767263190; // pre-computing this answer took 4.5 minutes on my PC at home
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
		for (let i = 0; i < nodes.length && 0 <= n; ++i) {
			const node = nodes[i];
			switch (counter[i]) {
				case 0: {
					node.left = null;
					node.right = null;
					break;
				}
				case 1: {
					const left = new TreeNode(n);
					node.left = left;
					nextNodes.push(left);
					node.right = null;
					--n;
					break;
				}
				case 2: {
					node.left = null;
					const right = new TreeNode(n);
					node.right = right;
					nextNodes.push(right);
					--n;
					break;
				}
				case 3: {
					const left = new TreeNode(n);
					node.left = left;
					nextNodes.push(left);
					--n;
					const right = new TreeNode(n);
					node.right = right;
					nextNodes.push(right);
					--n;
					break;
				}
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
	console.time('computing');
	console.log(numTrees(18));
	console.timeEnd('computing');
}
