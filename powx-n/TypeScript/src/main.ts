function myPow(x: number, n: number): number {
    let result = 1;
    let nAbs = Math.abs(n);
    const xSquared = nAbs >= 2 ? x * x : 1;
    const xTripled = nAbs >= 3 ? xSquared * x : 1;
    const xFour = nAbs >= 4 ? xTripled * x : 1;
    while (nAbs > 4) {
        result *= xFour;
        nAbs -= 4;
    }
    while (nAbs > 3) {
        result *= xTripled;
        nAbs -= 3;
    }
    while (nAbs > 2) {
        result *= xSquared;
        nAbs -= 2;
    }
    while (nAbs > 0) {
        result *= x;
        nAbs -= 1;
    }
    if (n < 0)
        result = 1 / result;
    return result;
}

console.log(myPow(3, 1));
console.log(myPow(3, 2));
console.log(myPow(2, 10));
console.log(myPow(2, -2));