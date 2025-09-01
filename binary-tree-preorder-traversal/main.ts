import { TreeNode } from '../treeNode.ts';

function preorderTraversal(root: TreeNode | null, items: number[] = []): number[] {
	if (root) {
		items.push(root.val);
		preorderTraversal(root.left, items);
		preorderTraversal(root.right, items);
	}
	return items;
}

if (import.meta.main) {
}
