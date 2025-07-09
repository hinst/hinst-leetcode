/*
Given a binary tree, determine if it is height-balanced.
A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.
*/

import { TreeNode } from '../treeNode.ts';


function isBalanced(root: TreeNode | null): boolean {
	return checkBalanced(0, root).isBalanced;
}

class TreeInfo {
	constructor(public readonly depth: number, public readonly isBalanced: boolean) {}
}

function checkBalanced(depth: number, node: TreeNode | null): TreeInfo {
	if (!node)
		return new TreeInfo(depth, true);
	depth++
	const leftInfo = checkBalanced(depth, node.left);
	const rightInfo = checkBalanced(depth, node.right);
	return new TreeInfo(
		Math.max(leftInfo.depth, rightInfo.depth),
		leftInfo.isBalanced && rightInfo.isBalanced &&
			Math.abs(leftInfo.depth - rightInfo.depth) <= 1
	);
}


export const isBalancedEx = isBalanced;

if (import.meta.main) {
	const tree = TreeNode.unwrap( [1,2,3,4,5,6,null,8] );
	console.log(tree?.toString());
	console.log(isBalanced(tree));
}
