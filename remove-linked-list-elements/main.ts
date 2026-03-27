import { buildListNodeChain, ListNode, unwrapListNodeChain } from '../listNode.ts';

function removeElements(head: ListNode | null, val: number): ListNode | null {
	while (head?.val === val)
		head = head.next;
	for (let item = head; item; item = item.next) {
		while (item.next?.val === val)
			item.next = item.next.next;
	}
	return head;
}

if (import.meta.main) {
	const head = [1,2,6,3,4,5,6], val = 6;
	const result = removeElements(buildListNodeChain(head), val);
	console.log(unwrapListNodeChain(result));
}
