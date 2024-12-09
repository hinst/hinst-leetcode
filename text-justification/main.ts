function fullJustify(words: string[], maxWidth: number): string[] {
	const lines: string[] = [];
	let currentLine: string[] = [];
	let currentLineLength = 0;
	for (const word of words) {
		const needLength = word.length + (currentLine.length ? 1 : 0);
		const newLength = currentLineLength + needLength;
		if (newLength <= maxWidth) {
			currentLine.push(word);
			currentLineLength = newLength;
		} else {
			lines.push(currentLine.join(' '));
			currentLineLength = word.length;
			currentLine = [word];
		}
	}
	if (currentLine.length)
		lines.push(currentLine.join(' '));
	return lines;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	const words = ["This", "is", "an", "example", "of", "text", "justification."];
	const limit = 16;
	console.log('-'.repeat(limit) + '+');
	console.log(fullJustify(words, limit).map(s => s + '|').join('\n'));
}
