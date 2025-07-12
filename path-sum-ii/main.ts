/*
	Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths
	where the sum of the node values in the path equals targetSum.
	Each path should be returned as a list of the node values, not node references.
	A root-to-leaf path is a path starting from the root and ending at any leaf node.
	A leaf is a node with no children.
*/

import { TreeNode } from '../treeNode.ts';

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
	const item = new PathSum(targetSum);
	item.find(root, 0, 0);
	return item.paths;
}

class PathSum {
	readonly paths: number[][] = [];
	readonly path: number[] = [];

	constructor(readonly targetSum: number) {
	}

	find(root: TreeNode | null, depth: number, currentSum: number) {
		if (!root)
			return this.paths;
		this.path[depth] = root.val;
		++depth;
		this.path.length = depth;
		currentSum += root.val;
		if (currentSum === this.targetSum && !root.left && !root.right)
			this.paths.push(this.path.slice());
		this.find(root.left, depth, currentSum);
		this.find(root.right, depth, currentSum);
	}
}

if (import.meta.main) {
}
