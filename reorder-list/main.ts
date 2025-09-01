import { buildListNodeChain, ListNode } from '../listNode.ts';


function reorderList(head: ListNode | null): void {
	const nodes: ListNode[] = [];
	for (let node = head; node; node = node.next)
		nodes.push(node);
	const newNodes: ListNode[] = [];
	let previousNode: ListNode | null = null;
	let toggle = true;
	while (nodes.length) {
		const nextNode = (toggle ? nodes.shift() : nodes.pop()) || null;
		if (previousNode)
			previousNode.next = nextNode;
		previousNode = nextNode;
	}
	if (previousNode)
		previousNode.next = null;
}


if (import.meta.main) {
	reorderList(buildListNodeChain([1, 2, 3, 4, 5]));
}
