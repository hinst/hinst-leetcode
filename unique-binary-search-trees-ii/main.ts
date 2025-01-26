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

function generateTrees(n: number): Array<TreeNode | null> {
	const results: (TreeNode | null)[] = [];
	const root = new TreeNode(n);
	build(root, [root], n - 1, results);
	return results;
}

function build(root: TreeNode, nodes: TreeNode[], remainingNodeCount: number, results: (TreeNode | null)[]) {
	if (remainingNodeCount <= 0) {
		results.push(cloneTree(root));
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

function cloneTree(node: TreeNode | null, counter: CounterWrapper = { counter: 0 }): TreeNode | null {
	if (node) {
		const left = cloneTree(node.left, counter);
		++counter.counter;
		const newNode = new TreeNode(counter.counter, left);
		const right = cloneTree(node.right, counter);
		newNode.right = right;
		return newNode;
	} else
		return null;
}


function printTree(node: TreeNode | null, depth = 0) {
	if (!node)
		return;
	const indentation = ' '.repeat(depth);
	console.log(indentation + node.val);
	if (node.left) {
		console.log(indentation + 'L' + (node.left ? '+' : '-'));
		printTree(node.left, depth + 1);
	}
	if (node.right) {
		console.log(indentation + 'R' + (node.right ? '+' : '-'));
		printTree(node.right, depth + 1);
	}
}

if (import.meta.main) {
	const trees = generateTrees(3);
	for (let i = 0; i < trees.length; ++i) {
		console.log(i + 1, '----------', '----------', '----------');
		printTree(trees[i]);
	}
}
