/** Definition for singly-linked list. */
class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val===undefined ? 0 : val)
		this.next = (next===undefined ? null : next)
	}
}


function deleteDuplicates(source: ListNode | null): ListNode | null {
	let tail: ListNode | null = null;
	let head: ListNode | null = null;
	while (source) {
		const currentValue = source.val;
		const nextValue = source.next?.val;
		if (currentValue !== nextValue) {
			if (!head)
				head = source;
			if (tail)
				tail.next = source;
			tail = source;
		}
		source = source.next;
	}
	return head;
}


if (import.meta.main) {
}
