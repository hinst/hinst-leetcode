import { TreeNode } from '../treeNode.ts';

function levelOrder(
	node: TreeNode | null,
	depth: number = 0,
	arrays: number[][] = []
): number[][] {
	if (!node)
		return arrays;
	while (!arrays[depth])
		arrays.push([]);
	arrays[depth].push(node.val);
	levelOrder(node.left, depth + 1, arrays);
	levelOrder(node.right, depth + 1, arrays);
	return arrays;
}

export const levelOrderEx = levelOrder;