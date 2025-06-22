import { TreeNode } from '../treeNode.ts';

/*
	106. Construct Binary Tree from Inorder and Postorder Traversal

	Inorder tree traversal:
		left subtree,
		current value,
		right subtree.
	Postorder tree traversal:
		left subtree,
		right subtree,
		current value.
*/

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
	return new Builder(inorder, postorder).build();
}

class Builder {
	/** value -> position */
	private readonly inorderMap = new Map<number, number>();

	constructor(inorder: number[], private readonly postorder: number[]) {
		for (let i = 0; i < inorder.length; ++i)
			this.inorderMap.set(inorder[i], i);
	}

	build(postorder: number[] = this.postorder): TreeNode | null {
		if (!postorder.length)
			return null;
		const node = new TreeNode(postorder[postorder.length - 1]);
		const middleIndex = this.inorderMap.get(node.val)!;
		{
			const postorderLeft = postorder.filter(item => this.inorderMap.get(item)! < middleIndex);
			node.left = this.build(postorderLeft);
		}
		{
			const postorderRight = postorder.filter(item => this.inorderMap.get(item)! > middleIndex)
			node.right = this.build(postorderRight);
		}
		return node;
	}
}

export const buildTreeEx = buildTree;

if (import.meta.main) {
	const inorder = [9,3,15,20,7], postorder = [9,15,7,20,3];
	console.log(buildTree(inorder, postorder)?.toString());
}
