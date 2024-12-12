function simplifyPath(path: string): string {
	const inputParts = path.split('/');
	const outputParts: string[] = [];
	for (let i = 0; i < inputParts.length; ++i) {
		const part = inputParts[i];
		if (!part.length || part === '.')
			continue;
		if (part === '..') {
			outputParts.pop();
			continue;
		}
		outputParts.push(part);
	}
	return '/' + outputParts.join('/');
}

function test(path: string) {
	console.log(path, '->', simplifyPath(path));
}

if (import.meta.main) {
	test('/home/');
	test('/home//foo/');
	test('/home/user/Documents/../Pictures');
	test('/../');
	test('/.../a/../b/c/../d/./');
}
