function removeElement(items: number[], val: number): number {
	let left = 0;
	let right = items.length - 1;
	while (left <= right) {
		if (items[left] !== val)
			++left;
		else if (items[right] !== val) {
			items[left] = items[right];
			items[right] = val;
		} else
			right--;
	}
	return left;
}

const array = [3,2,2,3];
const n = removeElement(array, 2)
console.log(n, array, array.slice(0, n));