function threeSumClosest(nums: number[], target: number): number {
    let bestSum = 0;
    let bestDiff = -1;
    for (let aIndex = 0; aIndex < nums.length; ++aIndex) {
        for (let bIndex = aIndex + 1; bIndex < nums.length; bIndex++) {
            for (let cIndex = bIndex + 1; cIndex < nums.length; cIndex++) {
                const sum = nums[aIndex] + nums[bIndex] + nums[cIndex];
                const diff = Math.abs(target - sum);
                if (bestDiff === -1 || diff < bestDiff) {
                    bestSum = sum;
                    bestDiff = diff;
                }
            }
        }
    }
    return bestSum;
};

console.log(threeSumClosest([-1,2,1,-4], 1));
console.log(threeSumClosest([0,0,0], 1));