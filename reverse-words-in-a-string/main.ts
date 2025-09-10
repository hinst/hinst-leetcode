function reverseWords(s: string): string {
	return s.split(' ').reverse().filter(s => s.length).join(' ');
}

if (import.meta.main) {
	const s = "  hello world  ";
	console.log(reverseWords(s));
}
