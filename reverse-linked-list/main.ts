import { buildListNodeChain, ListNode, unwrapListNodeChain } from '../listNode.ts';

function reverseList(head: ListNode | null): ListNode | null {
	let newHead: ListNode | null = null;
	while (head) {
		if (newHead)
			newHead = new ListNode(head.val, newHead);
		else
			newHead = new ListNode(head.val);
		head = head.next;
	}
	return newHead;
}

if (import.meta.main) {
	let head = buildListNodeChain([1,2,3,4,5]);
	console.log(unwrapListNodeChain(reverseList(head)));
	head = buildListNodeChain([1,2]);
	console.log(unwrapListNodeChain(reverseList(head)));
	head = buildListNodeChain([]);
	console.log(unwrapListNodeChain(reverseList(head)));
}
