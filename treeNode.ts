/**
* Definition for a binary tree node.
*/
export class TreeNode {
	val: number
	left: TreeNode | null
	right: TreeNode | null
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = (val===undefined ? 0 : val)
		this.left = (left===undefined ? null : left)
		this.right = (right===undefined ? null : right)
	}

	static unwrap(array: number[]): TreeNode | null {
		if (!array.length)
			return null;
		const nodes = [new TreeNode(array[0], null, null)];
		let iArray = 0;
		for (let iNode = 0; iNode < nodes.length; iNode++) {
			const node = nodes[iNode];
			const left = array[++iArray];
			if (left != null) {
				node.left = new TreeNode(left, null, null);
				nodes.push(node.left);
			}
			const right = array[++iArray];
			if (right != null) {
				node.right = new TreeNode(right, null, null);
				nodes.push(node.right);
			}
		}
		return nodes[0];
	}

	toString(indent = 0): string {
		return ' '.repeat(indent) + this.val + '\n' +
			(this.left ? this.left.toString(indent + 1) : ' '.repeat(indent + 1) + null) + '\n' +
			(this.right ? this.right.toString(indent + 1) : ' '.repeat(indent + 1) + null);
	}
}


