function myPow(x: number, n: number): number {
    let result = 1;
    if (n >= 0)
        for (let i = 0; i < n; ++i) {
            result *= x;
        }
    else {
        for (let i = 0; i < -n; i++) {
            result *= x;
        }
        result = 1 / result;
    }
    return result;
};

console.log(myPow(3, 2));
console.log(myPow(2, 10));
console.log(myPow(2, -2));