import { TreeNode } from '../treeNode.ts';

function hasPathSum(root: TreeNode | null, targetSum: number, currentSum = 0): boolean {
	if (!root)
		return false;
	currentSum += root.val;
	if (currentSum === targetSum && !root.left && !root.right)
		return true;
	return hasPathSum(root.left, targetSum, currentSum) || hasPathSum(root.right, targetSum, currentSum);
}

if (import.meta.main) {
}
