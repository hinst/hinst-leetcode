function swapPairs(head: ListNode | null): ListNode | null {
    let resultHead: ListNode | null = null;
    let resultLast: ListNode | null = null;
    let isMajor = true;
    while (head) {
        const next = head.next;
        if (isMajor) {
            const currentNode = new ListNode(head.val);
            if (next) {
                const nextNode = new ListNode(next.val);
                if (resultLast)
                    resultLast.next = nextNode;
                if (!resultHead)
                    resultHead = nextNode;
                resultLast = nextNode;
            }
            if (resultLast)
                resultLast.next = currentNode;
            if (!resultHead)
                resultHead = currentNode;
            resultLast = currentNode;
        }
        head = next;
        isMajor = !isMajor;
    }
    return resultHead;
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

console.log(createArray(swapPairs(createList([1,2,3,4,5]))));
