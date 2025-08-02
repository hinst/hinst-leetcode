import { TreeNode } from '../treeNode.ts';


function maxPathSum(root: TreeNode | null): number {
	if (!root)
		return 0;
	return new Finder(root).find();
}

class Finder {
	private readonly nodes: TreeNode[] = [];
	private readonly parents: Map<TreeNode, TreeNode> = new Map();
	private readonly visited: Set<TreeNode> = new Set();
	/** Source -> Current -> Sum */
	private readonly cache: Map<TreeNode | null, Map<TreeNode, number>> = new Map();

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
			this.visited.clear();
			const sum = this.findSum(null, node);
			if (max === undefined || max < sum)
				max = sum;
		}
		return max || 0;
	}

	private findSum(source: TreeNode | null, node: TreeNode | null): number {
		if (!node)
			return 0;
		if (this.visited.has(node))
			return 0;
		let sum = this.cache.get(source)?.get(node);
		if (sum !== undefined)
			return sum;
		sum = this.findSumInternal(node);
		let sourceCache = this.cache.get(source);
		if (!sourceCache) {
			sourceCache = new Map();
			this.cache.set(source, sourceCache);
		}
		sourceCache.set(node, sum);
		return sum;
	}

	private findSumInternal(node: TreeNode): number {
		this.visited.add(node);
		const parentSum = this.findSum(node, this.parents.get(node) || null);
		const leftSum = this.findSum(node, node.left);
		const rightSum = this.findSum(node, node.right);
		return node.val + Math.max(0, parentSum, leftSum, rightSum);
	}
}


export const maxPathSumEx = maxPathSum;

if (import.meta.main) {
	const tree = TreeNode.unwrap([1, 2, 3]);
	console.log(tree?.toString());
	console.log(maxPathSum(tree));
}
