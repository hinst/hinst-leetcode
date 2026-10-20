import crypto from 'crypto';

function getHash(text: string) {
	return crypto.createHash('sha256').update(text).digest().readUInt32BE();
}

class Item {
	constructor(public readonly text: string, public readonly isFull: boolean) {
	}
}

class Trie {
	private readonly map = new Map<number, Item[]>();

	insert(word: string): void {
		for (let i = 1; i <= word.length; ++i) {
			const part = word.substring(0, i);
			const hash = getHash(word);
			const item = new Item(part, i === word.length);
			const items = this.map.get(hash) ?? [];
			items.push(item);
			this.map.set(hash, items);
		}
	}

	search(word: string): boolean {
		const items = this.map.get(getHash(word));
		if (!items)
			return false;
		for (const item of items)
			if (item.isFull && item.text === word)
				return true;
		return false;
	}

	startsWith(prefix: string): boolean {
		const items = this.map.get(getHash(prefix));
		if (!items)
			return false;
		for (const item of items)
			if (item.isFull && item.text.startsWith(prefix))
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