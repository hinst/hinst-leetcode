/*
	Given the root of a binary tree, flatten the tree into a "linked list":

	The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
	The "linked list" should be in the same order as a pre-order traversal of the binary tree.

	Pre-order, NLR
	Visit the current node (in the figure: position red).
	Recursively traverse the current node's left subtree.
	Recursively traverse the current node's right subtree.
*/

import { TreeNode } from '../treeNode.ts';

/**	Do not return anything, modify root in-place instead. */
function flatten(root: TreeNode | null): void {
	if (!root)
		return;
	const solver = new Flatten();
	solver.run(root);
	root.left = null;
	root.right = solver.root?.right || null;
}

class Flatten {
	public root: TreeNode | null = null;
	private latest: TreeNode | null = null;

	run(node: TreeNode | null) {
		if (!node)
			return;
		const newNode = new TreeNode(node.val);
		if (!this.latest) {
			this.latest = newNode;
		} else {
			this.latest.right = newNode;
			this.latest = newNode;
		}
		if (!this.root)
			this.root = this.latest;
	}
}

if (import.meta.main) {
}
