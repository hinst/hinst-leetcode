/*
Given a binary tree, determine if it is height-balanced.
A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.
*/

import { TreeNode } from '../treeNode.ts';

function isBalanced(root: TreeNode | null): boolean {
	const depths = new Array<number>();
	readLeafDepths(0, depths, root);
	depths.sort((a, b) => a - b);
	return depths.length
		? Math.abs(depths[0] - depths[depths.length - 1]) <= 1
		: true;
}

function readLeafDepths(depth: number, depths: number[], node: TreeNode | null) {
	if (!node)
		return;
	if (node.left || node.right) {
		readLeafDepths(depth + 1, depths, node.left);
		readLeafDepths(depth + 1, depths, node.right);
	} else
		depths.push(depth + 1);
}

if (import.meta.main) {
	console.log(isBalanced(TreeNode.unwrap([3,9,20,null,null,15,7])));
	console.log(isBalanced(TreeNode.unwrap([1,2,2,3,3,null,null,4,4])));
}
