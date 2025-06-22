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
	return new Builder(preorder, inorder).build();
}

class Builder {
	/** value -> position */
	private readonly inorderMap: Map<number, number>;

	constructor(
		private readonly preorder: number[],
		inorder: number[]
	) {
		this.inorderMap = new Map();
		for (let i = 0; i < inorder.length; ++i)
			this.inorderMap.set(inorder[i], i);
	}

	build(preorder: number[] = this.preorder): TreeNode | null {
		if (!preorder.length)
			return null;
		const node = new TreeNode(preorder[0]);
		const middleIndex = assertDefined(this.inorderMap.get(node.val));
		{
			const preorderLeft = preorder.filter(item => assertDefined(this.inorderMap.get(item)) < middleIndex);
			node.left = this.build(preorderLeft);
		}
		{
			const preorderRight = preorder.filter(item => assertDefined(this.inorderMap.get(item)) > middleIndex);
			node.right = this.build(preorderRight);
		}
		return node;
	}
}

function assertDefined<T>(input: T) {
	if (undefined === input)
		throw new Error('Undefined encountered');
	return input;
}

export const buildTreeEx = buildTree;

if (import.meta.main) {
	const expected = TreeNode.unwrap([3,9,20,null,null,15,7]);
	const actual = buildTreeEx([3,9,20,15,7], [9,3,15,20,7]);
	console.log(actual?.toString());
}