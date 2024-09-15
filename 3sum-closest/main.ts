function threeSumClosest(nums: number[], target: number): number {
    let bestSum = 0;
    let bestDiff = -1;
    nums.sort((a, b) => a - b);
    for (let aIndex = 0; aIndex < nums.length; ++aIndex) {
        for (let bIndex = aIndex + 1; bIndex < nums.length; ++bIndex) {
            let sum = nums[aIndex] + nums[bIndex];
            const remainder = target - sum;
            const closestRemainderIndex = binarySearch(nums, remainder, bIndex + 1);
            const closestRemainder = nums[closestRemainderIndex];
            if (closestRemainder !== undefined) {
                sum += closestRemainder;
                const diff = Math.abs(target - sum);
                if (diff < bestDiff || bestDiff === -1) {
                    bestSum = sum;
                    bestDiff = diff;
                }
            }
        }
    }
    return bestSum;
}

// Initially copied from https://stackoverflow.com/questions/22697936/binary-search-in-javascript
// Adjusted to find the closest number
function binarySearch(arr: number[], val: number, start = 0, end = arr.length - 1): number {;
    if (end < start)
        return -1;
    const mid = Math.floor((start + end) / 2);
    if (val === arr[mid])
        return mid;
    if (start >= end)
        return start;
    if (end - start === 1)
        return Math.abs(val - arr[start]) < Math.abs(val - arr[end]) ? start : end;
    return val < arr[mid]
        ? binarySearch(arr, val, start, mid)
        : binarySearch(arr, val, mid, end);
}

console.log(threeSumClosest([-84,92,26,19,-7,9,42,-51,8,30,-100,-13,-38], 78));
