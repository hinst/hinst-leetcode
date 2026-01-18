import { TreeNode} from '../treeNode.ts';

function rightSideView(root: TreeNode | null): number[] {
	const lastColumn: number[] = [];
	advance(lastColumn, 0, root);
	return lastColumn;
}

function advance(lastColumn: number[], depth: number, node: TreeNode | null) {
	if (!node)
		return;
	while (lastColumn[depth] == null)
		lastColumn.push(0);
	lastColumn[depth] = node.val;
	advance(lastColumn, depth + 1, node.left);
	advance(lastColumn, depth + 1, node.right);
}


if (import.meta.main) {
	console.log(rightSideView(TreeNode.unwrap([1,2,3,null,5,null,4])));
}
