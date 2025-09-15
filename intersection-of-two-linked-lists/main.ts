import { ListNode } from '../listNode.ts';

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
	const nodesA = new Set<ListNode>();
	while (headA) {
		nodesA.add(headA);
		headA = headA.next;
	}
	while (headB) {
		if (nodesA.has(headB))
			return headB;
		headB = headB.next;
	}
	return null;
}

if (import.meta.main) {
}
