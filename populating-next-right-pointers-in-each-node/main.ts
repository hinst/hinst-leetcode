/*
You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.
*/

class _Node {
	val: number
	left: _Node | null
	right: _Node | null
	next: _Node | null
	constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
		this.val = (val===undefined ? 0 : val)
		this.left = (left===undefined ? null : left)
		this.right = (right===undefined ? null : right)
		this.next = (next===undefined ? null : next)
	}
}


function connect(root: _Node | null): _Node | null {
	const connector = new Connector();
	connector.connect(0, root);
	return root;
}

class Connector {
	levels: _Node[] = [];

	connect(depth: number, node: _Node | null) {
		if (!node)
			return;
		if (this.levels[depth])
			node.next = this.levels[depth];
		this.levels[depth] = node;
		++depth;
		this.connect(depth, node.right);
		this.connect(depth, node.left);
	}
}


if (import.meta.main) {
}
