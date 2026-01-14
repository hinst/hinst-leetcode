/**
	Do not return anything, modify nums in-place instead.
*/
function rotate(items: number[], steps: number): void {
	const source = items.slice(0);
	for (let i = 0; i < items.length; ++i) {
		const newIndex = (i + steps) % items.length;
		items[newIndex] = source[i];
	}
}

if (import.meta.main) {
	const nums = [1,2,3,4,5,6,7], k = 3;
	rotate(nums, k);
	console.log(nums.join(', '));
}
