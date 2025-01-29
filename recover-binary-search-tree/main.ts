/**
 * Definition for a binary tree node.
 */
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}


class TreeCover {
	private allNodes: TreeNode[] = [];
	private wrongNode?: TreeNode;

	constructor(public readonly root: TreeNode) {
	}

	recover() {
		this.build([this.root]);
	}

	private build(path: TreeNode[], depth: number = 0): boolean {
		const lastNode = path[path.length - 1];
		this.allNodes.push(lastNode);
		let isValid = true;
		for (let i = 0; i < path.length - 1 && isValid; ++i) {
			const isLeft = path[i].left === path[i + 1];
			isValid = isLeft
				? lastNode.val < path[i].val
				: path[i].val < lastNode.val;
		}
		if (lastNode.left) {
			path.push(lastNode.left);
			if (!this.build(path, depth + 1))
				isValid = false;
			path.pop();
		}
		if (lastNode.right) {
			path.push(lastNode.right);
			if (!this.build(path, depth + 1))
				isValid = false;
			path.pop();
		}
		if (!isValid)
			this.wrongNode = lastNode;
		return isValid;
	}
}

/**
 Do not return anything, modify root in-place instead.
 */
function recoverTree(root: TreeNode | null): void {
	if (!root)
		return;
	new TreeCover(root).recover();
}


if (import.meta.main) {
	console.log(recoverTree({"val":1,"left":{"val":3,"left":null,"right":{"val":2,"left":null,"right":null}},"right":null}));
}
