function findSubstring(s: string, wordArray: string[]): number[] {
	const availableIndexes = new Set(wordArray.map((_, index) => index));
	const currentWords: string[] = [];
	const results = new Set<number>();
	function check() {
		if (currentWords.length === wordArray.length) {
			const text = currentWords.join('');
			const textIndex = s.indexOf(text);
			if (textIndex !== -1)
				results.add(textIndex);
		} else
			for (const availableIndex of new Set(availableIndexes)) {
				availableIndexes.delete(availableIndex);
				currentWords.push(wordArray[availableIndex]);
				check();
				currentWords.pop();
				availableIndexes.add(availableIndex);
			}
	}
	check();
	return Array.from(results);
}

let s: string;
let words: string[];

s = "foobarfoobar", words = ["foo","bar"];
console.log(findSubstring(s, words));

s = "barfoofoobarthefoobarman", words = ["bar","foo","the"];
console.log(findSubstring(s, words));

s = "wordgoodgoodgoodbestword"; words = ["word","good","best","good"];
console.log(findSubstring(s, words));
