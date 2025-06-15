import { TreeNode } from '../treeNode.ts';

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
	const node = new TreeNode(preorder[0]);
	return buildNext(node, node, preorder, inorder, 1);
}

function buildNext(root: TreeNode, node: TreeNode, preorder: number[], inorder: number[], index: number): TreeNode | null {
	if (index >= preorder.length) {
		console.log(root.toString());
		return checkArraysEqual(inorderTraversal(root), inorder) ? root : null;
	}
	const value = preorder[index];
	const newNode = new TreeNode(value);
	node.left = newNode;
	{
		const answer = buildNext(root, newNode, preorder, inorder, index + 1);
		if (answer)
			return answer;
	}
	node.left = null;
	node.right = newNode;
	return buildNext(root, newNode, preorder, inorder, index + 1);
}

function inorderTraversal(root: TreeNode | null): number[] {
	const values: number[] = [];
	if (root) {
		values.push(...inorderTraversal(root.left));
		values.push(root.val);
		values.push(...inorderTraversal(root.right));
	}
	return values;
}

function checkArraysEqual(a: number[], b: number[]): boolean {
	if (a.length !== b.length)
		return false;
	for (let i = 0; i < a.length; ++i)
		if (a[i] !== b[i])
			return false;
	return true;
}

export const buildTreeEx = buildTree;