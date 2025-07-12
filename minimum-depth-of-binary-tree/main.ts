/*
Given a binary tree, find its minimum depth.
The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
Note: A leaf is a node with no children.
*/

import { TreeNode } from '../treeNode.ts';


function minDepth(root: TreeNode | null, depth = 0): number {
	if (!root)
		return 0 === depth ? 0 : -1;
	depth += 1;
	if (!root.left && !root.right)
		return depth;
	const leftDepth = minDepth(root.left, depth);
	const rightDepth = minDepth(root.right, depth);
	if (leftDepth === -1)
		return rightDepth;
	if (rightDepth === -1)
		return leftDepth;
	return Math.min(leftDepth, rightDepth);
}


export const minDepthEx = minDepth;

if (import.meta.main) {
}
