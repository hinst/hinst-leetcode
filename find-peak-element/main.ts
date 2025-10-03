function findPeakElement(items: number[], start = 0, end = items.length - 1): number {
	if (start === end)
		return start;
	if (start + 1 === end)
		return items[start] < items[end] ? end : start;
	const middle = Math.floor((start + end) / 2);
	if (items[middle - 1] <= items[middle])
		return findPeakElement(items, middle, end);
	else
		return findPeakElement(items, start, middle);
}


export const findPeakElementEx = findPeakElement;

if (import.meta.main) {
	console.log(findPeakElementEx([1]));
}
