import { TreeNode } from '../treeNode.ts';

function levelOrderBottom(root: TreeNode | null, depth = 0, containers: number[][] = []): number[][] {
	if (!root)
		return containers;
	containers[depth] = containers[depth] || [];
	containers[depth].push(root.val);
	levelOrderBottom(root.left, depth + 1, containers);
	levelOrderBottom(root.right, depth + 1, containers);
	if (depth === 0)
		containers.reverse();
	return containers;
}

if (import.meta.main) {
	console.log(levelOrderBottom(TreeNode.unwrap([3,9,20,null,null,15,7])));
}
