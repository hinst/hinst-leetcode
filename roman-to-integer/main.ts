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

function romanToInt(s: string): number {
    let result = 0;
    for (let i = ALL.length - 1; i >= 0; i--) {
        for (const key of Object.keys(ALL[i]).reverse()) {
            const digit = ALL[i][key];
            if (digit.length && s.startsWith(digit)) {
                result += parseInt(key) * Math.pow(10, i);
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