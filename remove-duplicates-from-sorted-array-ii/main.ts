function removeDuplicates(items: number[]): number {
	let beforeLastItem: number | undefined = undefined;
	let lastItem: number | undefined = undefined;
	let targetIndex = 0;
	for (let i = 0; i < items.length; ++i) {
		const currentItem = items[i];
		const isStalling = beforeLastItem === lastItem && lastItem === currentItem;
		if (!isStalling) {
			items[targetIndex] = currentItem;
			targetIndex++
		}
		beforeLastItem = lastItem;
		lastItem = items[i];
	}
	return targetIndex;
}

if (import.meta.main) {
	const array = [1,1,1,2,2,3];
	console.log(removeDuplicates(array));
	console.log(array);
}
if (import.meta.main) {
	const array = [0,0,1,1,1,1,2,3,3];
	console.log(removeDuplicates(array));
	console.log(array);
}
