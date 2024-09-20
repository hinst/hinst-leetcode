const MAX_INT32 = 2147483647; // Math.pow(2, 31) - 1;
const MIN_INT32 = -2147483648; // -Math.pow(2, 31);

function divide(dividend: number, divisor: number): number {
    let sum = 0;
    let result = 0;
    const isDirect = dividend > 0 && divisor > 0 || dividend < 0 && divisor < 0;
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    if (divisor === 1)
        result = dividend;
    else
        for (let i = 0; i != dividend; ++i) {
            if (dividend === sum) {
                result = i;
                break;
            }
            if (dividend < sum) {
                result = i - 1;
                break;
            }
            sum += divisor;
        }
    result = isDirect ? result : -result;
    if (result < MIN_INT32)
        result = MIN_INT32;
    if (result > MAX_INT32)
        result = MAX_INT32;
    return result;
}

console.log(divide(-2147483648, -3));