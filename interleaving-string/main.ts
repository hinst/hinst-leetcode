function isInterleave(s1: string, s2: string, combinedText: string): boolean {
	return advance(
		Array.from(s1).map(item => item.charCodeAt(0)), 0,
		Array.from(s2).map(item => item.charCodeAt(0)), 0,
		Array.from(combinedText).map(item => item.charCodeAt(0)), 0
	);
}

function advance(
	s1: number[], index1: number,
	s2: number[], index2: number,
	combinedText: number[], combinedIndex: number
): boolean {
	if (combinedIndex >= combinedText.length)
		return index1 === s1.length && index2 === s2.length;
	const canAdvance1 = combinedText[combinedIndex] === s1[index1] &&
		advance(s1, index1 + 1, s2, index2, combinedText, combinedIndex + 1);
	const canAdvance2 = combinedText[combinedIndex] === s2[index2] &&
		advance(s1, index1, s2, index2 + 1, combinedText, combinedIndex + 1);
	return canAdvance1 || canAdvance2;
}

if (import.meta.main) {
	console.log(isInterleave('cbcccbabbccbbcccbbbcabbbabcababbbbbbaccaccbabbaacbaabbbc', 'abcbbcaababccacbaaaccbabaabbaaabcbababbcccbbabbbcbbb', 'abcbcccbacbbbbccbcbcacacbbbbacabbbabbcacbcaabcbaaacbcbbbabbbaacacbbaaaabccbcbaabbbaaabbcccbcbabababbbcbbbcbb'));
}
