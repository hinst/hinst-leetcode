const THOUSANDS = [
    '',
    'M',
    'MM',
    'MMM',
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
    'CM',
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
    'XC',
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
    'IX',
];
function intToRoman(num: number): string {
    const thousand = Math.floor(num / 1000);
    num = num % 1000;
    const hundred = Math.floor(num / 100);
    num = num % 100;
    const ten = Math.floor(num / 10);
    num = num % 10;
    return THOUSANDS[thousand] + HUNDREDS[hundred] + TENS[ten] + ONES[num];
};

console.log(intToRoman(3749));