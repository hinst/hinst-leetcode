const THOUSANDS: Record<string, string> = {
    undefined: '',
    '0': '',
    '1': 'M',
    '2': 'MM',
    '3': 'MMM'
};
const HUNDREDS: Record<string, string> = {
    undefined: '',
    '0': '',
    '1': 'C',
    '2': 'CC',
    '3': 'CCC',
    '4': 'CD',
    '5': 'D',
    '6': 'DC',
    '7': 'DCC',
    '8': 'DCCC',
    '9': 'CM'
};
const TENS: Record<string, string> = {
    undefined: '',
    '0': '',
    '1': 'X',
    '2': 'XX',
    '3': 'XXX',
    '4': 'XL',
    '5': 'L',
    '6': 'LX',
    '7': 'LXX',
    '8': 'LXXX',
    '9': 'XC'
};
const ONES: Record<string, string> = {
    undefined: '',
    '0': '',
    '1': 'I',
    '2': 'II',
    '3': 'III',
    '4': 'IV',
    '5': 'V',
    '6': 'VI',
    '7': 'VII',
    '8': 'VIII',
    '9': 'IX'
};
const ALL = [ONES, TENS, HUNDREDS, THOUSANDS];
function intToRoman(num: number): string {
    const text = num.toString();
    return text.split('').map((character, index) => ALL[text.length - index - 1][character]).join('');
};

console.log(intToRoman(3749));