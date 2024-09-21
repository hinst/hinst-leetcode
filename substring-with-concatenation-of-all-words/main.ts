function findSubstring(s: string, wordArray: string[]): number[] {
	const matchedIndexes = new Array<Set<number>>(...wordArray.map(word => {
		const indexes = new Set<number>();
			for (
				let textIndex = s.indexOf(word);
				textIndex !== -1;
				textIndex = s.indexOf(word, textIndex + 1)
			)
				indexes.add(textIndex);
		return indexes;
	}));
	for (const matchedSet of matchedIndexes)
		if (!matchedSet.size)
			return [];

	const availableIndexes = new Set(wordArray.map((_, index) => index));
	const currentIndexes: number[] = [];
	const results = new Set<number>();
	function check() {
		if (currentIndexes.length === wordArray.length) {
			const startingPoints = matchedIndexes[currentIndexes[0]];
			for (const startingPoint of startingPoints) {
				let matched = true;
				let sumIndex = startingPoint;
				for (let i = 1; i < currentIndexes.length; ++i) {
					sumIndex += wordArray[currentIndexes[0]].length;
					if (!matchedIndexes[currentIndexes[i]].has(sumIndex))
						matched = false;
				}
				if (matched)
					results.add(startingPoint);
			}
		} else
			for (const availableIndex of new Set(availableIndexes)) {
				availableIndexes.delete(availableIndex);
				currentIndexes.push(availableIndex);
				check();
				currentIndexes.pop();
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
console.warn('---');

s = "barfoofoobarthefoobarman", words = ["bar","foo","the"];
console.log(findSubstring(s, words));
console.warn('---');

s = "wordgoodgoodgoodbestword"; words = ["word","good","best","good"];
console.log(findSubstring(s, words));
console.warn('---');
