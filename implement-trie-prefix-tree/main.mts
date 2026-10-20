function getHash(text: string, limit: number) {
	// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
	let hash = 0;
	let index = 0;
	for (const char of text) {
		if (index >= limit)
			break;
    	hash = (hash << 5) - hash + char.charCodeAt(0);
    	hash |= 0; // Constrain to 32bit integer
		++index;
  	}
  	return hash;
}

class Trie {
	private readonly map = new Map<number, string[]>();

	insert(word: string): void {
		for (let i = 1; i <= word.length; ++i) {
			const hash = getHash(word, i);
			const words = this.map.get(hash) ?? [];
			words.push(word);
			this.map.set(hash, words);
		}
	}

	search(word: string): boolean {
		const items = this.map.get(getHash(word, word.length));
		if (!items)
			return false;
		for (const item of items)
			if (item === word)
				return true;
		return false;
	}

	startsWith(prefix: string): boolean {
		const items = this.map.get(getHash(prefix, prefix.length));
		if (!items)
			return false;
		for (const item of items)
			if (item.startsWith(prefix))
				return true;
		return false;
	}
}

/**
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/

const trie = new Trie();
trie.insert('apple');
console.log(trie.map);
console.log(trie.startsWith('app'));
