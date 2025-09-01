import { TreeNode } from '../treeNode.ts';


function postorderTraversal(root: TreeNode | null, items: number[] = []): number[] {
	if (root) {
		postorderTraversal(root.left, items);
		postorderTraversal(root.right, items);
		items.push(root.val);
	}
	return items;
}


if (import.meta.main) {
}
