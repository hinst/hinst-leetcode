class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

class ListNodeEx extends ListNode {
    previous: ListNodeEx | null;
    next: ListNodeEx | null = null;
    constructor(val?: number, next?: ListNode | null, previous?: ListNodeEx | null) {
        super(val, next);
        this.next = next || null as any;
        this.previous = previous || null;
    }
}

function removeNthFromEnd(_head: ListNode | null, n: number): ListNodeEx | null {
    let head = _head as ListNodeEx | null;
    let current = head;
    let last = current;
    while (current) {
        if (current.next)
            current.next.previous = current;
        last = current;
        current = current.next;
    }

    let right: ListNodeEx | null = null;
    let middle: ListNodeEx | null = last;
    let left: ListNodeEx | null = last?.previous || null;
    for (let i = 1; i <= n; ++i) {
        if (i === n) {
            if (left)
                left.next = right;
            else
                head = right;
        } else {
            right = middle;
            middle = left;
            left = left?.previous || null;
        }
    }
    return head;
};

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

console.log(createArray(createList([1,2,3,4,5])));
console.log(createArray(removeNthFromEnd(createList([1,2,3,4,5]), 2)));
console.log(createArray(removeNthFromEnd(createList([1]), 1)));
console.log(createArray(removeNthFromEnd(createList([1, 2]), 1)));
console.log(createArray(removeNthFromEnd(createList([1, 2]), 2)));