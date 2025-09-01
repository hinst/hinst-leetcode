/** LeetCode. Definition for singly-linked list. */
export class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val===undefined ? 0 : val)
		this.next = (next===undefined ? null : next)
	}
}

export function buildListNodeChain(items: number[]): ListNode | null {
	let head: ListNode | null = null;
	let tail: ListNode | null = null;
	for (const item of items) {
		const node = new ListNode(item);
		if (!head)
			head = node;
		if (!tail) {
			tail = node;
		} else {
			tail.next = node;
			tail = node;
		}
	}
	return head;
}