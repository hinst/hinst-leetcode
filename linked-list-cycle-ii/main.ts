import { ListNode } from '../listNode.ts';


function detectCycle(head: ListNode | null): ListNode | null {
	const nodes = new Set<ListNode>();
	while (head) {
		if (nodes.has(head))
			return head;
		nodes.add(head);
		head = head.next;
	}
	return null;
}


if (import.meta.main) {
}
