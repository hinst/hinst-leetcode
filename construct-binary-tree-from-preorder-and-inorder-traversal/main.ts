import { TreeNode } from '../treeNode.ts';

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
	const node = new TreeNode(preorder[0]);
	return node;
}

export const buildTreeEx = buildTree;