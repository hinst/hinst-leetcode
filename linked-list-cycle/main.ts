import { ListNode } from '../listNode.ts';

function hasCycle(head: ListNode | null): boolean {
	const nodes = new Set<ListNode>();
	while (head) {
		if (nodes.has(head))
			return true;
		nodes.add(head);
		head = head.next;
	}
	return false;
}

if (import.meta.main) {
}
