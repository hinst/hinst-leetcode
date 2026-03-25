import { buildListNodeChain, ListNode, unwrapListNodeChain } from '../listNode.ts';

function removeElements(head: ListNode | null, val: number): ListNode | null {
	return head;
}

if (import.meta.main) {
	const head = [1,2,6,3,4,5,6], val = 6;
	const result = removeElements(buildListNodeChain(head), val);
	console.log(unwrapListNodeChain(result));
}
