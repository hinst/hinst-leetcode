import { buildListNodeChain, ListNode } from '../listNode.ts';


function reorderList(head: ListNode | null): void {
	const nodes: ListNode[] = [];
	for (let node = head; node; node = node.next)
		nodes.push(node);
	const newNodes: ListNode[] = [];
	while (nodes.length) {
		if (nodes.length)
			newNodes.push(nodes.shift()!);
		if (nodes.length)
			newNodes.push(nodes.pop()!);
	}
	for (let i = 0; i < newNodes.length; ++i)
		newNodes[i].next = i === newNodes.length - 1 ? null : newNodes[i + 1];
}


if (import.meta.main) {
	reorderList(buildListNodeChain([1, 2, 3, 4, 5]));
}
