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

class Item {
	constructor(public readonly text: string, public readonly isFull: boolean) {
	}
}

class Trie {
	private readonly map = new Map<number, Item[]>();

	insert(word: string): void {
		for (let i = 1; i <= word.length; ++i) {
			const hash = getHash(word, i);
			const item = new Item(word, i === word.length);
			const items = this.map.get(hash) ?? [];
			items.push(item);
			this.map.set(hash, items);
		}
	}

	search(word: string): boolean {
		const items = this.map.get(getHash(word, word.length));
		if (!items)
			return false;
		for (const item of items)
			if (item.isFull && item.text === word)
				return true;
		return false;
	}

	startsWith(prefix: string): boolean {
		const items = this.map.get(getHash(prefix, prefix.length));
		if (!items)
			return false;
		for (const item of items)
			if (item.text.startsWith(prefix))
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
