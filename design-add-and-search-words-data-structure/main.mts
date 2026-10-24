type Node = Map<string, Node>;
const END_KEY = '#';
const END_NODE = new Map<string, Node>();

class WordDictionary {
	root: Node = new Map();

	constructor() {
	}

	addWord(word: string): void {
		let node = this.root;
		for (const character of word) {
			let nextNode = node.get(character);
			if (!nextNode) {
				nextNode = new Map();
				node.set(character, nextNode);
			}
			node = nextNode;
		}
		node.set(END_KEY, END_NODE);
	}

	search(word: string): boolean {
		let nodes = [this.root];
		for (const character of word) {
			const isAny = character === '.';
			const nextNodes: Node[] = [];
			for (const node of nodes) {
				if (isAny) {
					for (const nextNode of node.values())
						nextNodes.push(nextNode);
				} else {
					const nextNode = node.get(character);
					if (nextNode)
						nextNodes.push(nextNode);
				}
			}
			nodes = nextNodes;
		}
		return nodes.some(node => node.get(END_KEY));
	}
}

/**
* Your WordDictionary object will be instantiated and called as such:
* var obj = new WordDictionary()
* obj.addWord(word)
* var param_2 = obj.search(word)
*/

let wordDictionary = new WordDictionary();

const input1 = ["WordDictionary","addWord","addWord","addWord","addWord","search","search","addWord","search","search","search","search","search","search"];
const input2: string[][] = [[],["at"],["and"],["an"],["add"],["a"],[".at"],["bat"],[".at"],["an."],["a.d."],["b."],["a.d"],["."]];
const output = [null,null,null,null,null,false,false,null,true,true,false,false,true,false];

input1.forEach((input, index) => {
	const word = input2[index]?.[0] ?? '';
	switch (input) {
		case 'WordDictionary':
			wordDictionary = new WordDictionary();
			break;
		case 'addWord':
			console.log({addWord: word});
			wordDictionary.addWord(input2[index]?.[0] ?? '');
			break;
		case 'search':
			console.log({search: word});
			const result = wordDictionary.search(word);
			if (result !== output[index])
				throw new Error('Expected ' + output[index] + ' got ' + result);
			break;
	}
});

