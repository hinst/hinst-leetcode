import { buildListNodeChain, ListNode, unwrapListNodeChain } from '../listNode.ts';

class ListBuilder {
	head: ListNode | null = null;

	add(newValue: number) {
		const item = new ListNode(newValue);
		if (!this.head) {
			this.head = item;
			return;
		}
		const newItem = new ListNode(newValue);
		let previousItem: ListNode | null = null;
		let found = false;
		for (let item: ListNode | null = this.head; item; item = item.next) {
			if (newValue <= item.val) {
				if (previousItem) {
					previousItem.next = newItem;
					newItem.next = item;
				} else {
					this.head = newItem;
					newItem.next = item;
				}
				found = true;
				break;
			}
			previousItem = item;
		}
		if (!found && previousItem)
			previousItem.next = newItem;
	}
}

function insertionSortList(head: ListNode | null): ListNode | null {
	const builder = new ListBuilder();
	for (let item = head; item; item = item.next) {
		builder.add(item.val);
	}
	return builder.head;
}

if (import.meta.main) {
	const inputList = buildListNodeChain([4,2,1,3]);
	console.log(unwrapListNodeChain(inputList));
	const sortedList = insertionSortList(inputList);
	console.log(unwrapListNodeChain(sortedList));
}
