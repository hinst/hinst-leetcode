function fourSum(nums: number[], target: number): number[][] {
    nums.sort((a, b) => a - b);
    const existing = new Set<number>();
    const results: number[][] = [];
    for (let aIndex = 0; aIndex < nums.length; ++aIndex) {
        for (let bIndex = aIndex + 1; bIndex < nums.length; ++bIndex) {
            for (let cIndex = bIndex + 1; cIndex < nums.length; ++cIndex) {
                const a = nums[aIndex], b = nums[bIndex], c = nums[cIndex];
                const sum = a + b + c;
                const remainder = target - sum;
                const remainderIndex = binarySearch(nums, remainder, cIndex + 1);
                if (remainderIndex !== -1) {
                    const hash = a + b * 10 + c * 100 + remainder * 1000;
                    if (!existing.has(hash)) {
                        existing.add(hash);
                        results.push([a, b, c, remainder]);
                    }
                }
            }
        }
    }
    return results;
};

// Initially copied from https://stackoverflow.com/questions/22697936/binary-search-in-javascript
function binarySearch(arr: number[], val: number, start: number = 0): number {
    let end = arr.length - 1;
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        if (arr[mid] === val)
            return mid;
        if (val < arr[mid])
            end = mid - 1;
        else
            start = mid + 1;
    }
    return -1;
}

console.log(fourSum([1,0,-1,0,-2,2], 0));
console.log(fourSum([2,2,2,2,2], 8));
