/**
* Definition for a binary tree node.
*/
class TreeNode {
	val: number
	left: TreeNode | null
	right: TreeNode | null
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = (val===undefined ? 0 : val)
		this.left = (left===undefined ? null : left)
		this.right = (right===undefined ? null : right)
	}
}

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