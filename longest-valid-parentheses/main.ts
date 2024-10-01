/** Find length of the valid sequence which starts at index */
function find(s: string, index: number): number {
	let level = 0;
	let count = 0;
	let i: number;
	for (i = index; i < s.length; ++i) {
		switch (s[i]) {
			case '(':
				++level;
				break;
			case ')':
				--level;
				break;
		}
		if (level < 0)
			return count;
		else
			++count;
	}
	if (level === 0)
		return count;
	return 0;
}

function longestValidParentheses(s: string): number {
	let max = 0;
	for (let i = 0; i < s.length; ++i) {
		const current = find(s, i);
		if (max < current)
			max = current;
		if (max >= s.length - i)
			break;
	}
	return max;
}


export const longestValidParenthesesPublic = longestValidParentheses;
const s = '(()';
console.log('ANSWER', longestValidParentheses(s));
