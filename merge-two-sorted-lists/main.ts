class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    let head: ListNode | null = null;
    let last: ListNode | null = null;
    while (list1 || list2) {
        let nextValue: number | undefined = undefined;
        if (!list1 && list2) {
            nextValue = list2.val;
            list2 = list2.next;
        } else if (list1 && !list2) {
            nextValue = list1.val;
            list1 = list1.next;
        } else if (list1 && list2 && list1.val < list2.val) {
            nextValue = list1.val;
            list1 = list1.next;
        } else if (list1 && list2) {
            nextValue = list2.val;
            list2 = list2.next;
        } else
            throw new Error('Impossible situation');
        const nextNode = new ListNode(nextValue, null);
        if (last) {
            last.next = nextNode;
            last = nextNode;
        } else {
            head = nextNode;
            last = nextNode;
        }
    }
    return head;
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

const list1 = [1,2,4], list2 = [1,3,4];
console.log(createArray(
    mergeTwoLists(createList(list1), createList(list2))
));
console.log(createArray(
    mergeTwoLists(createList([]), createList([]))
));
console.log(createArray(
    mergeTwoLists(createList([]), createList([0]))
));
