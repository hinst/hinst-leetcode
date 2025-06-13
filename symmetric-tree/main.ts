import { TreeNode } from '../tree.ts';

function isSameTree(first: TreeNode | null, second: TreeNode | null): boolean {
	if (!first && !second)
		return true;
	if (!first || !second)
		return false;
	return first.val === second.val &&
		isSameTree(first.left, second.left) &&
		isSameTree(first.right, second.right);
}

function isSymmetric(root: TreeNode | null): boolean {
	if (!root)
		return true;
	const left = root.left;
	const right = root.right;
	if (left && right)
		return isSameTree(left, right);
	if (!left && !right)
		return true;
	return false;
}

export const isSymmetricEx = isSymmetric;