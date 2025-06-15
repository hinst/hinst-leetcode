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

	static unwrap(array: (number | null)[]): TreeNode | null {
		if (!array.length || !array[0])
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
		const indentCharacter = '  ';
		const indentText = indentCharacter.repeat(indent);
		let text = '' + this.val;
		if (this.left)
			text += '\n' + indentText + 'L: ' + this.left.toString(indent + 1);
		if (this.right)
			text += '\n' + indentText + 'R: ' + this.right.toString(indent + 1);
		return text;
	}

	equals(node: TreeNode | null): boolean {
		if (!node)
			return false;
		return this.val === node.val &&
			TreeNode.equal(this.left, node.left) &&
			TreeNode.equal(this.right, node.right);
	}

	static equal(a: TreeNode | null, b: TreeNode | null): boolean {
		if (!a && !b)
			return true;
		if (a && b)
			return a.equals(b);
		return false;
	}
}


