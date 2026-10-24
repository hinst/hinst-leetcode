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
		for (const character of word) {
			// console.log(character, nodes.map(node => Object.keys(node)));
			const nextNodes: Node[] = [];
			for (const node of nodes) {
				// console.log(character, Object.keys(node));
				if (character === '.')
					nextNodes.push(...Object.values(node))
				else if (node[character])
					nextNodes.push(node[character]);
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

