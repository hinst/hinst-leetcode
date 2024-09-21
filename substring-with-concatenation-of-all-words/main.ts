function findSubstring(s: string, wordArray: string[]): number[] {
	const availableWords = new Set(wordArray);
	const currentWords: string[] = [];
	const results: number[] = [];
	function check() {
		if (currentWords.length === wordArray.length) {
			const text = currentWords.join('');
			const textIndex = s.indexOf(text);
			if (textIndex !== -1)
				results.push(textIndex);
		} else
			for (const availableWord of new Set(availableWords)) {
				availableWords.delete(availableWord);
				currentWords.push(availableWord);
				check();
				currentWords.pop();
				availableWords.add(availableWord);
			}
	}
	check();
	return results;
}

let s: string;
let words: string[];

s = "barfoothefoobarman", words = ["foo","bar"];
console.log(findSubstring(s, words));

s = "barfoofoobarthefoobarman", words = ["bar","foo","the"];
console.log(findSubstring(s, words));

s = "wordgoodgoodgoodbestword"; words = ["word","good","best","good"];
console.log(findSubstring(s, words));
