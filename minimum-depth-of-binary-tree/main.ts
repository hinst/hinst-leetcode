/*
Given a binary tree, find its minimum depth.
The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
Note: A leaf is a node with no children.
*/

import { TreeNode } from '../treeNode.ts';


function minDepth(root: TreeNode | null, depth = 0): number {
	if (!root)
		return depth;
	if (!root.left && !root.right)
		return depth + 1;
	return Math.min(minDepth(root.left, depth + 1), minDepth(root.right, depth + 1));
}


export const minDepthEx = minDepth;

if (import.meta.main) {
}
