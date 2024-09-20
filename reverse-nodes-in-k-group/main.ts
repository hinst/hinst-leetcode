class ListLast {
	h: ListNode | null = null;
	l: ListNode | null = null;

	add(node: ListNode) {
		if (this.l)
			this.l.next = node;
		else
			this.h = node;
		this.l = node;
	}
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
	const group = new Array<number>(k);
	group.length = 0;
	const result = new ListLast();
	while (head) {
		group.push(head.val);
		if (group.length === k) {
			for (let i = group.length - 1; i >= 0; --i)
				result.add(new ListNode(group[i]));
			group.length = 0;
		}
		head = head.next;
	}
	for (const item of group)
		result.add(new ListNode(item));
	return result.h;
}

/** Definition for singly-linked list. */
class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = (val===undefined ? 0 : val)
		this.next = (next===undefined ? null : next)
	}
}

function createList(numbers: number[]): ListNode | null {
    let head: ListNode | null = null;
    let last: ListNode | null = null;
    for (const item of numbers) {
        const current = new ListNode(item);
        if (head == null) {
            head = current;
            last = current;
        } else if (last != null) {
            last.next = current;
            last = current;
        }
    }
    return head;
}

function createArray(list: ListNode | null): number[] {
    const result: number[] = [];
    while (list) {
        result.push(list.val);
        list = list.next;
    }
    return result;
}

console.log(createArray(reverseKGroup(createList([1,2,3,4,5]), 3)));
