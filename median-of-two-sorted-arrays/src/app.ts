function findMedianSortedArrays(numbers1: number[], numbers2: number[]): number {
    const sortedArray = new Int32Array(numbers1.length + numbers2.length);
    let index1 = 0;
    let index2 = 0;
    let sortedIndex = 0;
    while (true) {
        const number1 = numbers1[index1];
        const number2 = numbers2[index2];
        if (number1 == null && number2 == null)
            break;
        if (number1 == null) {
            sortedArray[sortedIndex] = number2;
            ++index2;
        } else if (number2 == null) {
            sortedArray[sortedIndex] = number1;
            ++index1;
        } else if (number1 < number2) {
            sortedArray[sortedIndex] = number1;
            ++index1;
        } else {
            sortedArray[sortedIndex] = number2;
            ++index2;
        }
        ++sortedIndex;
    }
    return findMedian(sortedArray);
};

function findMedian(sortedArray: Int32Array): number {
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