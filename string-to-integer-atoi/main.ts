const DIGITS = '0123456789';
const MIN_INT32 = (-1) * Math.pow(2, 31);
const MAX_INT32 = Math.pow(2, 31) - 1;
const MAX_LENGTH = MIN_INT32.toString().length;

function myAtoi(s: string): number {
    while (s[0] === ' ')
        s = s.substring(1);
    const sign = s[0];
    const isMinus = sign === '-';
    if ('-+'.includes(s[0]))
        s = s.substring(1);
    while (s[0] === '0')
        s = s.substring(1);
    let endIndex = 0;
    while (DIGITS.includes(s[endIndex]))
        ++endIndex;
    s = s.substring(0, endIndex);
    if (!s.length)
        return 0;
    if (s.length > MAX_LENGTH)
        return isMinus ? MIN_INT32 : MAX_INT32;
    let numberValue = (isMinus ? -1 : 1) * parseInt(s);
    if (numberValue < MIN_INT32)
        numberValue = MIN_INT32;
    if (MAX_INT32 < numberValue)
        numberValue = MAX_INT32;
    return numberValue;
};

console.log(myAtoi('42'));