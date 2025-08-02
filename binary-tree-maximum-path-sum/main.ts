import { TreeNode } from '../treeNode.ts';

function maxPathSum(root: TreeNode | null): number {
	if (!root)
		return 0;
	return new Finder(root).find();
}

class Finder {
	readonly nodes: TreeNode[] = [];
	readonly parents: Map<TreeNode, TreeNode> = new Map();

	constructor(root: TreeNode) {
		this.gather(root);
	}

	private gather(node: TreeNode) {
		this.nodes.push(node);
		if (node.left) {
			this.parents.set(node.left, node);
			this.gather(node.left);
		}
		if (node.right) {
			this.parents.set(node.right, node);
			this.gather(node.right);
		}
	}

	find(): number {
		let max: number | undefined;
		for (const node of this.nodes) {
			const sum = this.findSum(node);
			if (max === undefined || max < sum)
				max = sum;
		}
		return max || 0;
	}

	findSum(node: TreeNode): number {
		let sum = node.val;
		return sum;
	}
}


export const maxPathSumEx = maxPathSum;

if (import.meta.main) {
	const tree = TreeNode.unwrap([1,2,3]);
	console.log(maxPathSum(tree));
}
