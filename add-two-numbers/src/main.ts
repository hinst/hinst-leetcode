export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const BASE = 10;
    let nodeResult: ListNode | null = null;
    let lastNodeResult: ListNode | null = null;
    let sumLeftover = 0;
    while (l1 || l2) {
        let sum = sumLeftover + (l1 ? l1.val : 0) + (l2 ? l2.val : 0);
        sumLeftover = 0;
        if (sum >= BASE) {
            sumLeftover = Math.trunc(sum / BASE);
            sum = sum % BASE;
        }
        const newNode = {val: sum, next: null};
        if (!nodeResult)
            nodeResult = newNode;
        if (!lastNodeResult)
            lastNodeResult = newNode;
        else {
            lastNodeResult.next = newNode;
            lastNodeResult = newNode;
        }
        if (l1)
            l1 = l1.next;
        if (l2)
            l2 = l2.next;
    }
    if (sumLeftover && lastNodeResult)
        lastNodeResult.next = { val: sumLeftover, next: null };
    return nodeResult;
};