/** Definition for _Node. */
class _Node {
	val: number
	next: _Node | null
	random: _Node | null
	constructor(val?: number, next?: _Node, random?: _Node) {
		this.val = (val===undefined ? 0 : val)
		this.next = (next===undefined ? null : next)
		this.random = (random===undefined ? null : random)
	}
}


function copyRandomList(head: _Node | null): _Node | null {
	const ids = new Map<_Node, number>();
	const newNodes = new Map<number, _Node>();
	let node = head;
	let id = 0;
	while (node) {
		ids.set(node, id);
		node = node.next;
		++id;
	}
	node = head;
	let newHead: _Node | null = null;
	let newTail: _Node | null = null;
	while (node) {
		const newNode = new _Node(node.val);
		newNodes.set(ids.get(node)!, newNode);
		if (newHead && newTail) {
			newTail.next = newNode;
			newTail = newNode;
		} else
			newHead = newTail = newNode;
		node = node.next;
	}
	node = head;
	while (node) {
		let id = ids.get(node)!;
		const newNode = newNodes.get(id);
		if (!newNode)
			continue;
		if (node.random) {
			id = ids.get(node.random)!;
			newNode.random = newNodes.get(id) || null;
		}
		node = node.next;
	}
	return newHead;
}


if (import.meta.main) {
}
