function findMedianSortedArrays(numbers1: number[], numbers2: number[]): number {
    const sortedArray: number[] = [];
    let index1 = 0;
    let index2 = 0;
    while (true) {
        const number1 = numbers1[index1];
        const number2 = numbers2[index2];
        if (number1 == null && number2 == null)
            break;
        if (number1 == null) {
            sortedArray.push(number2);
            ++index2;
        } else if (number2 == null) {
            sortedArray.push(number1);
            ++index1;
        } else if (number1 < number2) {
            sortedArray.push(number1)
            ++index1;
        } else {
            sortedArray.push(number2);
            ++index2;
        }
    }
    return findMedian(sortedArray);
};

function findMedian(sortedArray: number[]): number {
    if (sortedArray.length === 0)
        throw new Error('Empty array cannot have a median');
    const middleIndex = Math.floor(sortedArray.length / 2);
    if (sortedArray.length % 2 === 1)
        return sortedArray[middleIndex];
    else
        return (sortedArray[middleIndex - 1] + sortedArray[middleIndex]) / 2;
}

// const nums1 = [1,3], nums2 = [2];
const nums1 = [1,2], nums2 = [3,4];
console.log(findMedianSortedArrays(nums1, nums2));