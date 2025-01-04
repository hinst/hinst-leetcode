/**Definition for singly-linked list. */
class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val===undefined ? 0 : val)
		this.next = (next===undefined ? null : next)
	}
}


function partition(head: ListNode | null, x: number): ListNode | null {
    let firstNode1: ListNode | null  = null;
    let lastNode1: ListNode | null = null;
	let firstNode2: ListNode | null  = null;
	let lastNode2: ListNode | null = null;
	while (head) {
		const node = new ListNode(head.val, null);
		if (head.val < x) {
			firstNode1 ||= node;
			if (lastNode1)
				lastNode1.next = node;
			lastNode1 = node;
		} else {
			firstNode2 ||= node;
			if (lastNode2)
				lastNode2.next = node;
			lastNode2 = node;
		}
		head = head.next;
	}
	if (!firstNode1 && firstNode2)
		firstNode1 = firstNode2;
	if (lastNode1 && firstNode2)
		lastNode1.next = firstNode2;
	return firstNode1;
}


function createList(numbers: number[]): ListNode | null {
    let lastNode: ListNode | null = null;
    let firstNode: ListNode | null  = null;
    for (const item of numbers) {
        const nextNode: ListNode = { val: item, next: null };
        if (lastNode) {
            lastNode.next = nextNode;
            lastNode = nextNode;
        }
        if (!firstNode) {
            firstNode = nextNode;
            lastNode = firstNode;
        }
    }
    return firstNode;
}

function createArray(node: ListNode | null): number[] {
    const result: number[] = [];
    while (node) {
        result.push(node.val);
        node = node.next;
    }
    return result;
}

if (import.meta.main) {
	console.log(createArray(
		partition(createList([1,4,3,2,5,2]), 3)
	));
}
