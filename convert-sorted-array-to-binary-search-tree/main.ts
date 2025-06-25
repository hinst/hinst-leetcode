import { TreeNode } from '../treeNode.ts';

function sortedArrayToBST(items: number[]): TreeNode | null {
	if (items.length <= 0)
		return null;
	const middleIndex = Math.floor(items.length / 2);
	const node = new TreeNode(items[middleIndex]);
	node.left = sortedArrayToBST(items.slice(0, middleIndex));
	node.right = sortedArrayToBST(items.slice(middleIndex + 1));
	return node;
}

if (import.meta.main) {
}
