const ZERO_CHARACTER_CODE = '0'.charCodeAt(0);

function multiply(number1: string, number2: string): string {
	const result = '0';
	return result;
}

function add(number1: string, number2: string): string {
	let result = '';
	let index1 = number1.length - 1;
	let index2 = number2.length - 1;
	let leftover = 0;
	while (index1 >= 0 || index2 >= 0) {
		const character1 = index1 >= 0 ? number1[index1] : '0';
		const digit1 = character1.charCodeAt(0) - ZERO_CHARACTER_CODE;
		const character2 = index2 >= 0 ? number2[index2] : '0';
		const digit2 = character2.charCodeAt(0) - ZERO_CHARACTER_CODE;
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

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log(add('5', '5'));
	// console.log(multiply('123', '456'));
}
