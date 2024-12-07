import { ListNode } from './ListNode.ts';

class DualListNode extends ListNode {
	previous?: ListNode;
}

function rotateRight(head: DualListNode | null, k: number): ListNode | null {
	if (!head || 0 === k)
		return head;
	let [tail, length] = fillPreviousNode(head);
	k = k % length;
	for (let i = 0; i < k; ++i) {
		const oldHead = head;
		head = tail;
		head.next = oldHead;
		tail = tail.previous!;
		head.previous = undefined;
		tail.next = null;
	}
	return head;
}

/** @returns [tail, length] */
function fillPreviousNode(head: DualListNode): [DualListNode, number] {
	let length = 0;
	while (true) {
		const current = head;
		++length;
		if (head.next) {
			head = head.next;
			head.previous = current;
		} else
			return [head, length];
	}
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
	console.log(createArray(rotateRight(createList([1,2,3,4,5]), 2)));
	console.log(createArray(rotateRight(createList([0,1,2]), 4)));
	console.log(createArray(rotateRight(createList([1]), 0)));
}
