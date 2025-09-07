function evalRPN(tokens: string[]): number {
	const stack: number[] = [];
	for (const token of tokens) {
		switch (token) {
			case '+': {
				const a = stack.pop() || 0;
				const b = stack.pop() || 0;
				stack.push(a + b);
				break;
			}
			case '-': {
				const a = stack.pop() || 0;
				const b = stack.pop() || 0;
				stack.push(a - b);
				break;
			}
			case '*': {
				const a = stack.pop() || 0;
				const b = stack.pop() || 0;
				stack.push(a * b);
				break;
			}
			case '/': {
				const a = stack.pop() || 0;
				const b = stack.pop() || 1;
				stack.push(Math.trunc(a / b));
				break;
			}
			default: {
				const item = parseInt(token);
				stack.push(item);
			}
		}
	}
	return stack[0];
}

if (import.meta.main) {
	console.log(evalRPN(["2","1","+","3","*"]));
}
