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
	return checkValid([root]);
}

function checkValid(path: TreeNode[], depth: number = 0): boolean {
	const lastNode = path[path.length - 1];
	let isValid = true;
	for (let i = 0; i < path.length - 1 && isValid; ++i) {
		const isLeft = path[i].left === path[i + 1];
		isValid = isLeft
			? lastNode.val < path[i].val
			: path[i].val < lastNode.val;
	}
	if (isValid) {
		if (lastNode.left) {
			path.push(lastNode.left);
			isValid = checkValid(path, depth + 1);
			path.pop();
		}
		if (lastNode.right && isValid) {
			path.push(lastNode.right);
			isValid = checkValid(path, depth + 1);
			path.pop();
		}
	}
	return isValid;
}


if (import.meta.main) {
	console.log(isValidBST({"val":5,"left":{"val":4,"left":null,"right":null},"right":{"val":6,"left":{"val":3,"left":null,"right":null},"right":{"val":7,"left":null,"right":null}}}));
}
