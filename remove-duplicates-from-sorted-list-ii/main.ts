/** Definition for singly-linked list. */
class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val===undefined ? 0 : val);
		this.next = (next===undefined ? null : next);
	}
}


function deleteDuplicates(source: ListNode | null): ListNode | null {
	let head: ListNode | null = null;
	let tail: ListNode | null = null;
	let previousValue: number | undefined = undefined;
	while (source) {
		const currentValue = source.val;
		const nextValue = source.next?.val;
		if (currentValue !== previousValue && currentValue !== nextValue) {
			const node = new ListNode(currentValue, null);
			if (!head)
				head = node;
			if (!tail)
				tail = node;
			else {
				tail.next = node;
				tail = node;
			}
		}
		source = source.next;
		previousValue = currentValue;
	}
	return head;
}

function createList(items: number[]): ListNode | null {
	let head: ListNode | null = null;
	let tail: ListNode | null = null;
	for (const item of items) {
		const node = new ListNode(item, null);
		if (tail) {
			tail.next = node;
			tail = node;
		} else
			head = tail = node;
	}
	return head;
}

function createArray(node: ListNode | null) {
	const result: number[] = [];
	while (node) {
		result.push(node.val);
		node = node.next;
	}
	return result;
}

if (import.meta.main) {
	const input = [1,2,3,3,4,4,5];
	console.log(createArray(deleteDuplicates(createList(input))));
}
