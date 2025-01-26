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


function generateTrees(n: number): Array<TreeNode | null> {
	const results: TreeNode[] = [];
	const root = new TreeNode(n);
	build(root, [root], n - 1, results);
	return results;
}

function build(root: TreeNode, nodes: TreeNode[], remainingNodeCount: number, results: TreeNode[]) {
	if (remainingNodeCount <= 0)
		console.log(root);
	const counter: number[] = new Array(nodes.length).fill(0);
	do {
		let n = remainingNodeCount;
		const nextNodes: TreeNode[] = [];
		for (let i = 0; i < nodes.length; ++i) {
			if (counter[i] === 0) {
				nodes[i].left = null;
				nodes[i].right = null;
			} else if (counter[i] === 1) {
				--n;
				const left = new TreeNode(n);
				nodes[i].left = left;
				nextNodes.push(left);
				nodes[i].right = null;
			} else if (counter[i] === 2) {
				--n;
				nodes[i].left = null;
				const right = new TreeNode(n);
				nodes[i].right = right;
				nextNodes.push(right);
			} else if (counter[i] === 3) {
				--n;
				const left = new TreeNode(n);
				nodes[i].left = left;
				nextNodes.push(left);
				--n;
				const right = new TreeNode(n);
				nodes[i].right = right;
				nextNodes.push(right);
			}
		}
		if (0 <= n && n < remainingNodeCount)
			build(root, nextNodes, n, results);
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
	console.log(generateTrees(3));
}
