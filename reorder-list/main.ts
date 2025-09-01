import { buildListNodeChain, ListNode } from '../listNode.ts';


function reorderList(head: ListNode | null): void {
	const nodes: ListNode[] = [];
	for (let node = head; node; node = node.next)
		nodes.push(node);
	let previousNode: ListNode | null = null;
	let toggle = true;
	let beginning = 0;
	let ending = nodes.length - 1;
	while (beginning <= ending) {
		const nextNode = (toggle ? nodes[beginning++] : nodes[ending--]) || null;
		if (previousNode)
			previousNode.next = nextNode;
		previousNode = nextNode;
		toggle = !toggle;
	}
	if (previousNode)
		previousNode.next = null;
}


if (import.meta.main) {
	reorderList(buildListNodeChain([1, 2, 3, 4, 5]));
}
