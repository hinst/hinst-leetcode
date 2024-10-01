function find(s: string, index: number): number {
	let level = 0;
	console.log(s.slice(index));
	for (let i = index; i < s.length; ++i) {
		switch (s[i]) {
			case '(':
				++level;
				break;
			case ')':
				--level;
				break;
		}
		if (level < 0)
			return i;
	}
	return 0;
}

export function longestValidParentheses(s: string): number {
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

const s = ')()())';
console.log(longestValidParentheses(s));
