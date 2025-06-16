import { TreeNode } from '../treeNode.ts';

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
	const node = new TreeNode();
	return buildNext(node, [node], preorder, inorder, 1);
}

class Binary {
	value: number[];
	constructor(public readonly size: number) {
		this.value = new Array<number>(size).fill(0);
	}

	next(): boolean {
		for (let i = 0; i < this.size; ++i) {
			if (this.value[i] === 0) {
				this.value[i] = 1;
				return true;
			} else
				this.value[i] = 0;
		}
		return false;
	}
}

function buildNext(root: TreeNode, nodes: TreeNode[], preorder: number[], inorder: number[], index: number): TreeNode | null {
	if (index == preorder.length) {
		let subIndex = 0;
		preorderTraverse(root, function(node) {
			node.val = preorder[subIndex++];
		});
		return checkArraysEqual(inorderTraversal(root), inorder) ? root : null;
	}
	if (index > preorder.length)
		throw new Error('Logic error');
	const sequence = new Binary(nodes.length * 2);
	sequence.next();
	const nextNodes = new Array<TreeNode>();
	do {
		nextNodes.length = 0;
		let subIndex = index;
		for (let i = 0; i < nodes.length; ++i) {
			if (sequence.value[2 * i] && subIndex < preorder.length) {
				const node = new TreeNode();
				subIndex++;
				nodes[i].left = node;
				nextNodes.push(node);
			} else
				nodes[i].left = null;
			if (sequence.value[2 * i + 1] && subIndex < preorder.length) {
				const node = new TreeNode();
				subIndex++;
				nodes[i].right = node;
				nextNodes.push(node);
			} else
				nodes[i].right = null;
		}
		if (buildNext(root, nextNodes, preorder, inorder, subIndex))
			return root;
	} while (sequence.next());
	return null;
}

function inorderTraversal(root: TreeNode | null): number[] {
	const values: number[] = [];
	if (root) {
		values.push(...inorderTraversal(root.left));
		values.push(root.val);
		values.push(...inorderTraversal(root.right));
	}
	return values;
}

function preorderTraverse(root: TreeNode | null, f: (node: TreeNode) => void) {
	if (!root)
		return true;
	f(root);
	preorderTraverse(root.left, f);
	preorderTraverse(root.right, f);
}

function checkArraysEqual(a: number[], b: number[]): boolean {
	if (a.length !== b.length)
		return false;
	for (let i = 0; i < a.length; ++i)
		if (a[i] !== b[i])
			return false;
	return true;
}

export const buildTreeEx = buildTree;

if (import.meta.main) {
	const answer = buildTreeEx([3,9,20,15,7], [9,3,15,20,7])
	console.log('ANSWER:');
	console.log(answer?.toString());
}