/*
Given a binary tree, determine if it is height-balanced.
A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.
*/

import { TreeNode } from '../treeNode.ts';


function isBalanced(root: TreeNode | null): boolean {
	const depths = new Array<number>();
	readDepths(0, depths, root);
	depths.sort((a, b) => a - b);
	return depths.length
		? Math.abs(depths[0] - depths[depths.length - 1]) <= 1
		: true;
}

function readDepths(depth: number, depths: number[], node: TreeNode | null) {
	if (!node)
		return;
	if (node.left)
		readDepths(depth + 1, depths, node.left);
	else
		depths.push(depth + 1);
	if (node.right)
		readDepths(depth + 1, depths, node.right);
	else
		depths.push(depth + 1);
}


export const isBalancedEx = isBalanced;

if (import.meta.main) {
	const tree = TreeNode.unwrap([1,null,2,null,3]);
	console.log(tree?.toString());
	console.log(isBalanced(tree));
}
