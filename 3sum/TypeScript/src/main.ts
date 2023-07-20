type ThreeNumbers = [number, number, number];

class ThreeEntryContainer {
    private entriesMap = new Map<number, Map<number, Set<number>>>();
    public entries: ThreeNumbers[] = [];

    add(a: number, b: number, c: number) {
        const alreadyExists = this.checkExists(a, b, c) ||
            this.checkExists(a, c, b) ||
            this.checkExists(b, a, c) ||
            this.checkExists(b, c, a) ||
            this.checkExists(c, a, b) ||
            this.checkExists(c, b, a);
        if (!alreadyExists) {
            this.entries.push([a, b, c]);
            let firstMap = this.entriesMap.get(a);
            if (!firstMap) {
                firstMap = new Map();
                this.entriesMap.set(a, firstMap);
            }
            let secondSet = firstMap.get(b);
            if (!secondSet) {
                secondSet = new Set();
                firstMap.set(b, secondSet);
            }
            secondSet.add(c);
        }
    }

    private checkExists(a: number, b: number, c: number): boolean | undefined {
        return this.entriesMap.get(a)?.get(b)?.has(c);
    }
}

function threeSum(nums: number[]): ThreeNumbers[] {
    const map = new Map<number, number>(nums.map((item, index) => [item, index]));
    const results = new ThreeEntryContainer();
    nums.forEach(function(firstItem, firstIndex) {
        for (let secondIndex = firstIndex + 1; secondIndex < nums.length; ++secondIndex) {
            const secondItem = nums[secondIndex];
            const desiredItem = 0 - firstItem - secondItem;
            const thirdIndex = map.get(desiredItem);
            const matched = thirdIndex !== undefined &&
                thirdIndex != secondIndex && thirdIndex != firstIndex;
            if (matched)
                results.add(firstItem, secondItem, desiredItem);
        }
    });
    return results.entries;
}

function checkArraysEqual(a: any[], b: any[]) {
    return a.length == b.length && a.every((value, index) => value == b[index]);
}

function checkEqual(a: ThreeNumbers[], b: ThreeNumbers[]): boolean {
    a = [...a];
    a.forEach((value, index) => {
        a[index] = value.sort((a, b) => a - b);
    });
    b.forEach((value, index) => {
        b[index] = value.sort((a, b) => a - b);
    });
    return a.length == b.length && a.every(aEntry => b.some(bEntry => checkArraysEqual(aEntry, bEntry)));
}

function test(numbers: number[], expectedOutput: ThreeNumbers[]) {
    const output = threeSum(numbers);
    const matched = checkEqual(expectedOutput, output);
    console.log(matched, numbers, 'expected', expectedOutput, 'actual', output);
}

test([-1,0,1,2,-1,-4], [[-1,-1,2],[-1,0,1]]);
test([0,1,1], []);
test([0,0,0], [[0,0,0]]);