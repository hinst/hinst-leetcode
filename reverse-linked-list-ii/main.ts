/**
* Definition for singly-linked list.
*/
class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val === undefined ? 0 : val);
		this.next = (next === undefined ? null : next);
	}
}


class ListNodeEx extends ListNode {
	previous?: ListNode | null;
}

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
	let previous: ListNode | null = null;
	let leftNode: ListNode | null = null;
	let rightNode: ListNode | null = null;
	let node: ListNode | null = head;
	let index = 0;
	while (node) {
		++index;
		if (previous)
			(node as ListNodeEx).previous = previous;
		if (index === left)
			leftNode = node;
		if (index === right)
			rightNode = node;
		previous = node;
		node = node.next;
	}
	if (leftNode && rightNode) {
		leftNode = reverseList(leftNode, rightNode);
		if (left === 1)
			head = leftNode;
	}
	return head;
}

function reverseList(leftNode: ListNode, rightNode: ListNode): ListNode | null {
	if (leftNode === rightNode)
		return leftNode;
	let left = (leftNode as ListNodeEx).previous || null;
	let leftTail = left;
	let right: ListNode | null = rightNode;
	while (right) {
		if (leftTail) {
			leftTail.next = new ListNode(right.val, null);
			leftTail = leftTail.next;
		} else
			leftTail = new ListNode(right.val, null);
		if (!left)
			left = leftTail;
		if (right !== leftNode)
			right = (right as ListNodeEx).previous || null;
		else
			break;
	}
	if (rightNode.next && leftTail)
		leftTail.next = rightNode.next;
	return left;
}


export function createList(array: number[]): ListNode | null {
	let head: ListNode | null = null;
	let tail: ListNode | null = null;
	for (const item of array) {
		const node = new ListNode(item, null);
		if (!head)
			head = node;
		if (!tail)
			tail = node;
		else {
			tail.next = node;
			tail = node;
		}
	}
	return head;
}

export function createArray(node: ListNode | null) {
	const array: number[] = [];
	while (node) {
		array.push(node.val);
		node = node.next;
	}
	return array;
}

export const reverseBetweenEx = reverseBetween;

if (import.meta.main) {
	console.log(createArray(reverseBetween(createList([1,2,3,4,5]), 1, 2)));
}
