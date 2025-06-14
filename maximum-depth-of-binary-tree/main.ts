import { TreeNode } from '../treeNode.ts';

function maxDepth(node: TreeNode | null): number {
	if (!node)
		return 0;
	return Math.max(1 + maxDepth(node.left), 1 + maxDepth(node.right));
}