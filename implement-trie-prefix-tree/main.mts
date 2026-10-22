type Item = Record<string, any>;

class Trie {
	private readonly root: Item = {};

	insert(word: string): void {
		let previousItem = this.root;
		for (const character of word) {
			let item = previousItem[character] as Item;
			if (!item) {
				item = {};
				previousItem[character] = item;
			}
			previousItem = item;
		}
		previousItem.ending = true;
	}

	search(word: string): boolean {
		let previousItem = this.root;
		for (const character of word) {
			let item = previousItem[character];
			if (!item)
				return false;
			previousItem = item;
		}
		return !!previousItem.ending;
	}

	startsWith(prefix: string): boolean {
		let previousItem = this.root;
		for (const character of prefix) {
			let item = previousItem[character];
			if (!item)
				return false;
			previousItem = item;
		}
		return true;
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
console.log(trie.root);
console.log(trie.startsWith('app'));
