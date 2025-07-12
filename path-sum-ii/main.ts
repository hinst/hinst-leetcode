/*
	Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths
	where the sum of the node values in the path equals targetSum.
	Each path should be returned as a list of the node values, not node references.
	A root-to-leaf path is a path starting from the root and ending at any leaf node.
	A leaf is a node with no children.
*/

import { TreeNode } from '../treeNode.ts';

function pathSum(
	root: TreeNode | null, targetSum: number,
	depth: number = 0, currentSum = 0, paths: number[][] = [], path: number[] = []
): number[][] {
	if (!root)
		return paths;
	path[depth] = root.val;
	++depth;
	path.length = depth;
	currentSum += root.val;
	if (currentSum === targetSum && !root.left && !root.right)
		paths.push(path.slice());
	pathSum(root.left, targetSum, depth, currentSum, paths, path);
	pathSum(root.right, targetSum, depth, currentSum, paths, path);
	return paths;
}

if (import.meta.main) {
}
