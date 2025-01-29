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


function isValidBST(root: TreeNode | null): boolean {
	if (!root)
		return true;
	const leftIsValid = root.left ? root.left.val < root.val && isValidBST(root.left) : true;
	const rightIsValid = root.right ? root.val < root.right.val && isValidBST(root.right) : true;
	return leftIsValid && rightIsValid;
}


if (import.meta.main) {
	console.log();
}
