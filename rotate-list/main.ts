import { ListNode } from './ListNode.ts';

function rotateRight(head: ListNode | null, k: number): ListNode | null {
	if (!head)
		return null;
	return head;
}

function createList(numbers: number[]): ListNode | null {
	if (0 === numbers.length)
		return null;
	const first = new ListNode(numbers[0], null);
	let current = first;
	for (let i = 1; i < numbers.length; ++i) {
		current.next = new ListNode(numbers[i], null);
		current = current.next;
	}
	return first;
}

function createArray(head: ListNode | null): number[] {
	const items: number[] = [];
	while (head) {
		items.push(head.val);
		head = head.next;
	}
	return items;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(createArray(rotateRight(createList([1,2,3,4,5]), 4)));
}
