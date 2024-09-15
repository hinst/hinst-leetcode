const THOUSANDS = [
    '',
    'M',
    'MM',
    'MMM'
];
const HUNDREDS = [
    '',
    'C',
    'CC',
    'CCC',
    'CD',
    'D',
    'DC',
    'DCC',
    'DCCC',
    'CM'
];
const TENS = [
    '',
    'X',
    'XX',
    'XXX',
    'XL',
    'L',
    'LX',
    'LXX',
    'LXXX',
    'XC'
];
const ONES = [
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX'
];
const ALL = [ONES, TENS, HUNDREDS, THOUSANDS];

function romanToInt(s: string): number {
    let result = 0;
    for (let i10 = ALL.length - 1; i10 >= 0; i10--) {
        const digits = ALL[i10];
        for (let i = digits.length - 1; i > 0; i--) {
            const digit = digits[i];
            if (s.startsWith(digit)) {
                result += i * Math.pow(10, i10);
                s = s.substring(digit.length);
            }
        }
    }
    return result;
};

console.log(romanToInt('III'));
console.log(romanToInt('LVIII'));
console.log(romanToInt('MCMXCIV'));
console.log(romanToInt('MDLXX'));