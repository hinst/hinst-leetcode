function removeElement(items: number[], val: number): number {
	const acceptedItems = new Array<number>(items.length);
	let acceptedCount = 0;
	for (const item of items)
		if (item !== val)
			acceptedItems[acceptedCount++] = item;
	for (let i = 0; i < acceptedCount; ++i)
		items[i] = acceptedItems[i];
	return acceptedCount;
}

const array = [0,1,2,2,3,0,4,2];
console.log(removeElement(array, 2));
console.log(array);