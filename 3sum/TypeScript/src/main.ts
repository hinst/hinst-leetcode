type ThreeNumbers = [number, number, number];

function threeSum(nums: number[]): number[][] {
    const map = new Map<number, number>(nums.map((item, index) => [item, index]));
    const matchedEntries: ThreeNumbers[] = [];
    nums.forEach((firstItem, firstIndex) => {
        for (let secondIndex = firstIndex + 1; secondIndex < nums.length; ++secondIndex) {
            const secondItem = nums[secondIndex];
            const desiredItem = 0 - firstItem - secondItem;
            const thirdIndex = map.get(desiredItem);
            const matched = thirdIndex !== undefined && secondIndex < thirdIndex &&
                thirdIndex != firstIndex && thirdIndex != secondIndex;
            if (matched)
                matchedEntries.push([firstItem, secondItem, desiredItem]);
        }
    });
    return matchedEntries;
};

function equals(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

function test(numbers: number[], expectedOutput: number[][]) {
    const output = threeSum(numbers);
    const matched = equals(expectedOutput, output);
    console.log(matched, numbers, '...', expectedOutput, '...', output);
}

test([-1,0,1,2,-1,-4], [[-1,-1,2],[-1,0,1]])