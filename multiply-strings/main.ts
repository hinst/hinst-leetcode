const ZERO_CHARACTER_CODE = '0'.charCodeAt(0);

function multiply(number1: string, number2: string): string {
	let result = '0';
	for (let i = number2.length - 1; i >= 0; --i) {
		const digit2 = number2.charCodeAt(i) - ZERO_CHARACTER_CODE;
		let intermediateResult = '0';
		for (let digit = 0; digit < digit2; ++digit) {
			intermediateResult = add(intermediateResult, number1);
		}
		if (intermediateResult !== '0')
			intermediateResult += '0'.repeat(number2.length - 1 - i);
		result = add(result, intermediateResult);
	}
	return result;
}

function add(number1: string, number2: string): string {
	let result = '';
	let index1 = number1.length - 1;
	let index2 = number2.length - 1;
	let leftover = 0;
	while (index1 >= 0 || index2 >= 0) {
		const digit1 = index1 >= 0 ? number1.charCodeAt(index1) - ZERO_CHARACTER_CODE : 0;
		const digit2 = index2 >= 0 ? number2.charCodeAt(index2) - ZERO_CHARACTER_CODE : 0;
		let sum = digit1 + digit2 + leftover;
		leftover = 0;
		if (sum >= 10) {
			leftover = Math.trunc(sum / 10);
			sum -= 10;
		}
		result = String.fromCharCode(sum + ZERO_CHARACTER_CODE) + result;
		--index1;
		--index2;
	}
	if (leftover > 0)
		result = String.fromCharCode(leftover + ZERO_CHARACTER_CODE) + result;
	return result;
}

export const multiplyExported = multiply;
export const addExported = add;

if (import.meta.main) {
	console.log(multiply('123', '456'));
}
