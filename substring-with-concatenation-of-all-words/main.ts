function createMatchedIndexes(s: string, wordArray: string[]) {
	return new Array<Uint16Array>(...wordArray.map(word => {
		const indexes: number[] = [];
			for (
				let textIndex = s.indexOf(word);
				textIndex !== -1;
				textIndex = s.indexOf(word, textIndex + 1)
			)
				indexes.push(textIndex);
		return new Uint16Array(indexes);
	}));
}

function findSubstring(s: string, wordArray: string[]): number[] {
	const matchedIndexes = createMatchedIndexes(s, wordArray);
	for (const matchedIndex of matchedIndexes)
		if (!matchedIndex.length)
			return [];
	const availableIndexes = new Set(wordArray.map((_, index) => index));
	const currentIndexes = new Uint16Array(wordArray.length);
	let currentSize = 0;
	const results = new Set<number>();
	let firstCharacterIndex = -1;
	let sumCharacterIndex = 0;
	function check() {
		if (currentSize === wordArray.length)
			results.add(firstCharacterIndex);
		for (const availableIndex of new Uint16Array(availableIndexes)) {
			availableIndexes.delete(availableIndex);
			currentIndexes[currentSize++] = availableIndex;
			for (const characterIndex of matchedIndexes[availableIndex]) {
				let offset: number | undefined;
				if (currentSize !== 1)
					offset = wordArray[availableIndex].length;
				if (offset !== undefined)
					sumCharacterIndex += offset;
				else {
					sumCharacterIndex = characterIndex;
					firstCharacterIndex = characterIndex;
				}
				if (sumCharacterIndex === characterIndex)
					check();
				if (offset !== undefined)
					sumCharacterIndex -= offset;
			}
			--currentSize;
			availableIndexes.add(availableIndex);
		}
	}
	check();
	return Array.from(results);
}

function main() {
	let s: string;
	let words: string[];

	s = "barfoothefoobarman", words = ["foo","bar"]
	console.log(findSubstring(s, words));
	console.warn('---');
}
main();