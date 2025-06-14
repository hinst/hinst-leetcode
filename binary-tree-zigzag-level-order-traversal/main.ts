import { TreeNode } from '../treeNode.ts';

function zigzagLevelOrder(
	node: TreeNode | null,
	depth: number = 0,
	arrays: number[][] = []
): number[][] {
	if (!node)
		return arrays;
	while (!arrays[depth])
		arrays.push([]);
	if (depth % 2 == 0)
		arrays[depth].push(node.val);
	else
		arrays[depth].unshift(node.val);
	zigzagLevelOrder(node.left, depth + 1, arrays);
	zigzagLevelOrder(node.right, depth + 1, arrays);
	return arrays;
}

export const zigzagLevelOrderEx = zigzagLevelOrder;