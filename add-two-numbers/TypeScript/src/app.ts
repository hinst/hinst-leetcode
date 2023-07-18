import { addTwoNumbers } from "./main";

function createArray(listNode: ListNode | null) {
    const array: number[] = [];
    while (listNode) {
        array.push(listNode.val);
        listNode = listNode.next;
    }
    return array;
}

function createList(array: number[]) {
    let node: ListNode | null = null;
    let lastNode: ListNode | null = null;
    for (const item of array) {
        const newNode = { val: item, next: null };
        if (!node)
            node = newNode;
        if (!lastNode)
            lastNode = newNode;
        else {
            lastNode.next = newNode;
            lastNode = newNode;
        }
    }
    return node;
}

function test(arrayLeft: number[], arrayRight: number[], arrayExpected: number[]) {
    const output = addTwoNumbers(createList(arrayLeft), createList(arrayRight));
    const arrayOutput = createArray(output);
    const matched = arrayOutput.length == arrayExpected.length &&
        arrayOutput.every((item, index) => item == arrayExpected[index]);
    if (matched)
        console.log(matched);
    else
        console.log(matched, arrayOutput, arrayExpected);
}

(function test1() {
    const l1 = [2,4,3], l2 = [5,6,4];
    const expectedOutput = [7,0,8];
    test(l1, l2, expectedOutput);
})();

(function test2() {
    const l1 = [0], l2 = [0];
    const expectedOutput = [0];
    test(l1, l2, expectedOutput);
})();

(function test3() {
    const l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9];
    const expectedOutput = [8,9,9,9,0,0,0,1];
    test(l1, l2, expectedOutput);
})()
