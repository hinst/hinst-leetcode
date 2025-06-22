import { TreeNode } from '../treeNode.ts';

/*
	Preorder tree walk:
		current value,
		left subtree,
		right subtree.
	Inorder tree walk:
		left subtree,
		current value,
		right subtree.
	Solution approach:
		read preorder sequence,
		find index of the current preorder item in the inorder array
		create left subtree using elements on the left side of the inorder array,
		create right subtree using elements on the right side of the inorder array.
*/
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
	const node = new TreeNode(preorder[0]);
}

export const buildTreeEx = buildTree;

import { preorder, inorder } from './t198.ts';

if (import.meta.main) {
	const answer = buildTreeEx(preorder, inorder)
	console.log('ANSWER:');
	console.log(answer?.toString());
}