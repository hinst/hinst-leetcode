import { TreeNode } from '../treeNode.ts';

function sumNumbers(root: TreeNode | null): number {
	const numberTexts: string[] = [];
	function gather(node: TreeNode | null, ongoing: string) {
		if (!node)
			return;
		ongoing += node.val;
		if (node.left)
			gather(node.left, ongoing);
		if (node.right)
			gather(node.right, ongoing);
		if (!node.left && !node.right)
			numberTexts.push(ongoing);
	}
	gather(root, '');
	let sum = 0;
	for (const text of numberTexts)
		sum += parseInt(text);
	return sum;
}

if (import.meta.main) {
	const root = TreeNode.unwrap([4,9,0,5,1]);
	console.log(sumNumbers(root));
}
