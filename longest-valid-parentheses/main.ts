/** Find length of the valid sequence which starts at index */
function find(s: string, index: number): number {
	let level = 0;
	let count = 0;
	let sealedCount = 0;
	let i: number;
	for (i = index; i < s.length; ++i) {
		if (s[i] === '(')
			++level;
		else
			--level;
		if (level < 0)
			return count;
		else {
			++count;
			if (level === 0)
				sealedCount = count;
		}
	}
	return sealedCount;
}

function longestValidParentheses(s: string): number {
	let max = 0;
	for (let i = 0; i < s.length; ++i) {
		const count = find(s, i);
		if (max < count)
			max = count;
		if (max >= s.length - i)
			break;
	}
	return max;
}


export const longestValidParenthesesPublic = longestValidParentheses;
const s = '(())(';
console.log('ANSWER', longestValidParentheses(s));
