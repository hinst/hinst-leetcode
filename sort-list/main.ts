import { ListNode } from '../listNode.ts';

function sortList(head: ListNode | null): ListNode | null {
	const items: ListNode[] = [];
    for (let item = head; item; item = item.next)
		items.push(item);
	items.sort((a, b) => a.val - b.val);
	for (let i = 0; i < items.length; ++i) {
		const nextItem = (i < items.length - 1) ? items[i + 1] : null;
		items[i].next = nextItem;
	}
	return items[0] || null;
}

if (import.meta.main) {
}
