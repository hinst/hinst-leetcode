type Item = Map<string, Item>;
const END = new Map();

class Trie {
	private readonly root: Item = new Map();

	insert(word: string): void {
		let previousItem = this.root;
		for (const character of word) {
			let item = previousItem.get(character) as Item;
			if (!item) {
				item = new Map();
				previousItem.set(character, item);
			}
			previousItem = item;
		}
		previousItem.set('end', END);
	}

	search(word: string): boolean {
		let previousItem = this.root;
		for (const character of word) {
			let item = previousItem.get(character);
			if (!item)
				return false;
			previousItem = item;
		}
		return previousItem.get('end') != null;
	}

	startsWith(prefix: string): boolean {
		let previousItem = this.root;
		for (const character of prefix) {
			let item = previousItem.get(character);
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
console.log(trie.startsWith('app'));
