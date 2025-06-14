import { TreeNode } from '../treeNode.ts';

function isSameTree(first: TreeNode | null, second: TreeNode | null): boolean {
	if (!first && !second)
		return true;
	if (!first && !second)
		return false;
	if (first && !second)
		return false;
	return first?.val === second?.val &&
		isSameTree(first?.left || null, second?.left || null) &&
		isSameTree(first?.right || null, second?.right || null);
}

function flipTree(node: TreeNode | null): TreeNode | null {
	if (!node)
		return node;
	const buffer = node.left;
	node.left = node.right;
	node.right = buffer;
	flipTree(node.left);
	flipTree(node.right);
	return node;
}

function isSymmetric(root: TreeNode | null): boolean {
	if (!root)
		return true;
	const left = root.left;
	const right = root.right;
	return isSameTree(left, flipTree(right));
}

export const isSymmetricEx = isSymmetric;