type Node = Record<string, any>;

class WordDictionary {
	root: Node = {};

	constructor() {
	}

	addWord(word: string): void {
		let node = this.root;
		for (const character of word) {
			if (!node[character])
				node[character] = {};
			node = node[character];
		}
		node.end = true;
	}

	search(word: string): boolean {
		let nodes = [this.root];
		// console.log(word);
		for (const character of word) {
			// console.log(nodes.map(node => Object.keys(node)));
			const nextNodes: Node[] = [];
			for (const node of nodes) {
				if (character === '.' || node[character])
					nextNodes.push(...Object.values(node))
			}
			nodes = nextNodes;
		}
		return nodes.some(node => node.end);
	}
}

/**
* Your WordDictionary object will be instantiated and called as such:
* var obj = new WordDictionary()
* obj.addWord(word)
* var param_2 = obj.search(word)
*/

const wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
console.log(wordDictionary.search("pad")); // return False
console.log(wordDictionary.search("bad")); // return True
console.log(wordDictionary.search(".ad")); // return True
console.log(wordDictionary.search("b..")); // return True