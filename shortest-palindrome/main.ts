function checkMirror(array: Uint8Array, limit: number) {
	for (
		let a = 0, b = limit - 1;
		a < b;
		++a, --b
	) {
		if (array[a] !== array[b])
			return false;
	}
	return true;
}

function addPrefix(array: Uint8Array, start: number): Uint8Array {
	const prefixLength = array.length - start;
	let left = 0;
	let right = array.length - 1;
	const output = new Uint8Array(prefixLength + array.length)
	for (let i = 0; i < output.length; ++i) {
		if (i < prefixLength) {
			output[i] = array[right] || 0;
			--right;
		} else {
			output[i] = array[left] || 0;
			++left;
		}
	}
	return output;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function shortestPalindrome(s: string): string {
	let array: Uint8Array<ArrayBufferLike> = textEncoder.encode(s);
	for (let i = array.length - 1; i >= 0; --i) {
		if (checkMirror(array, i)) {
			array = addPrefix(array, i);
			break;
		}
	}
	return textDecoder.decode(array);
}

console.log(shortestPalindrome('aacecaaa'));
console.log(shortestPalindrome('abcd'));
