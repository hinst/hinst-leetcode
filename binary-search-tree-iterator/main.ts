import { TreeNode } from '../treeNode.ts';

/**
	Your BSTIterator object will be instantiated and called as such:
	var obj = new BSTIterator(root)
	var param_1 = obj.next()
	var param_2 = obj.hasNext()
*/
class BSTIterator {
	private index: number = 0;
	private readonly items: number[] = [];

	constructor(root: TreeNode | null) {
		const items = this.items;
		function advance(node: TreeNode | null) {
			if (!node)
				return;
			advance(node.left);
			items.push(node.val);
			advance(node.right);
		}
		advance(root);
	}

	next(): number {
		const item =  this.items[this.index];
		++this.index;
		return item;
	}

	hasNext(): boolean {
		return this.index < this.items.length;
	}
}

if (import.meta.main) {
}
