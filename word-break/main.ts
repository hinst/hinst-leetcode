function wordBreak(s: string, wordDict: string[], index = 0): boolean {
	if (index === s.length)
		return true;
	for (const word of wordDict) {
		if (s.indexOf(word, index) === index) {
			if (wordBreak(s, wordDict, index + word.length))
				return true;
		}
	}
	return false;
}


export const wordBreakEx = wordBreak;

if (import.meta.main) {
	const s = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", wordDict = ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"];
	console.log(wordBreak(s, wordDict));
}
