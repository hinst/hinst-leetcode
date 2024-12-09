function merge(currentLine: string[], maxWidth: number, isLastLine: boolean): string {
	const currentLineLength = currentLine.map(word => word.length).reduce((a, b) => a + b, 0);
	const spaceLength = maxWidth - currentLineLength;
	const regularSpaceLength = isLastLine
		? 1
		: currentLine.length > 1
			? Math.trunc(spaceLength / (currentLine.length - 1))
			: 0;
	let remainder = spaceLength - regularSpaceLength * (currentLine.length - 1);
	const text: string[] = [];
	for (let i = 0; i < currentLine.length; ++i) {
		const word = currentLine[i];
		text.push(word);
		const isLastWord = i === currentLine.length - 1;
		if (isLastWord)
			text.push(' '.repeat(remainder));
		else {
			let space = regularSpaceLength;
			if (remainder > 0 && !isLastLine) {
				++space;
				--remainder;
			}
			text.push(' '.repeat(space));
		}
	}
	return text.join('');
}

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
			lines.push(merge(currentLine, maxWidth, false));
			currentLineLength = word.length;
			currentLine = [word];
		}
	}
	if (currentLine.length)
		lines.push(merge(currentLine, maxWidth, true));
	return lines;
}

function test(words: string[], limit: number) {
	const text = fullJustify(words, limit);
	console.log('-'.repeat(limit) + '+');
	console.log(text.map(s => s + '|').join('\n'));
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	test(["This", "is", "an", "example", "of", "text", "justification."], 16);
	test(["What","must","be","acknowledgment","shall","be"], 16);
	test(["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], 20);
}
