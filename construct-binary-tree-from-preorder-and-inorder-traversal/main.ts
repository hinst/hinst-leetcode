import { TreeNode } from '../treeNode.ts';

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
	return new Builder(preorder, inorder).build();
}

class Binary {
	value: number[];

	constructor(public readonly size: number) {
		this.value = new Array<number>(size).fill(0);
	}

	next(): boolean {
		for (let i = 0; i < this.size; ++i) {
			if (this.value[i] === 0) {
				this.value[i] = 1;
				return true;
			} else
				this.value[i] = 0;
		}
		return false;
	}
}

class Builder {
	private readonly root: TreeNode  = new TreeNode();

	constructor(readonly preorder: number[], readonly inorder: number[]) {
	}

	build(): TreeNode | null {
		return this.buildNext([this.root], 1);
	}

	private buildNext(nodes: TreeNode[], index: number): TreeNode | null {
		if (index == this.preorder.length) {
			preorderAssign(this.root, this.preorder);
			const isMatched = inorderCompare(this.root, this.inorder);
			return isMatched ? this.root : null;
		}
		if (index > this.preorder.length)
			throw new Error('Logic error');
		const sequence = new Binary(nodes.length * 2);
		sequence.next();
		const nextNodes = new Array<TreeNode>();
		do {
			nextNodes.length = 0;
			let subIndex = index;
			for (let i = 0; i < nodes.length; ++i) {
				if (sequence.value[2 * i] && subIndex < this.preorder.length) {
					const node = new TreeNode();
					subIndex++;
					nodes[i].left = node;
					nextNodes.push(node);
				} else
					nodes[i].left = null;
				if (sequence.value[2 * i + 1] && subIndex < this.preorder.length) {
					const node = new TreeNode();
					subIndex++;
					nodes[i].right = node;
					nextNodes.push(node);
				} else
					nodes[i].right = null;
			}
			if (this.buildNext(nextNodes, subIndex))
				return this.root;
		} while (sequence.next());
		return null;
	}
}

function preorderAssign(root: TreeNode | null, items: number[], index = 0): number {
	if (!root)
		return index;
	root.val = items[index++];
	index = preorderAssign(root.left, items, index);
	index = preorderAssign(root.right, items, index);
	return index;
}

function inorderCompare(root: TreeNode | null, items: number[], index = { i: 0 }): boolean {
	if (!root)
		return true;
	if (!inorderCompare(root.left, items, index))
		return false;
	if (root.val !== items[index.i++])
		return false;
	if (!inorderCompare(root.right, items, index))
		return false;
	return true;
}

export const buildTreeEx = buildTree;

import { preorder, inorder } from './t198.ts';

if (import.meta.main) {
	const answer = buildTreeEx(preorder, inorder)
	console.log('ANSWER:');
	console.log(answer?.toString());
}