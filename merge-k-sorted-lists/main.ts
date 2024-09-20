/** Definition for singly-linked list. */
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    let resultHead: ListNode | null = null;
    let resultLast: ListNode | null = null;
    while (true) {
        lists = lists.filter(Boolean);
        if (lists.length === 0)
            return resultHead;
        let min = 0;
        let minIndex = -1;
        for (let i = 0; i < lists.length; ++i) {
            const node = lists[i];
            if (node != null) {
                if (node.val < min || minIndex === -1) {
                    min = node.val;
                    minIndex = i;
                }
            }
        }
        const minNode = lists[minIndex];
        if (minNode != null) {
            lists[minIndex] = minNode.next;
            const resultNext = new ListNode(min);
            if (resultHead == null) {
                resultHead = resultNext;
                resultLast = resultNext;
            } else if (resultLast != null) {
                resultLast.next = resultNext;
                resultLast = resultNext;
            }
        }
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

function createLists(lists: number[][]): Array<ListNode | null> {
    return lists.map(createList);
}

console.log(createArray(mergeKLists(createLists([[1,4,5],[1,3,4],[2,6], []]))));
console.log(createArray(mergeKLists(createLists([]))));
console.log(createArray(mergeKLists(createLists([[]]))));