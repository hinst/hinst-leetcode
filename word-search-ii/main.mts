class CharacterNode {
	count: number = 0;
	next?: Record<string, CharacterNode>;
	hasEnding?: boolean;
}

class PrefixTree {
	root: CharacterNode = new CharacterNode();

	add(word: string) {
		let node = this.root;
		++node.count;
		for (const character of word) {
			if (!node.next)
				node.next = {};
			let nextNode = node.next[character];
			if (!nextNode) {
				nextNode = new CharacterNode();
				node.next[character] = nextNode;
			}
			node = nextNode;
			++node.count;
		}
		node.hasEnding = true;
	}

	findNext(node: CharacterNode | undefined, character: string): CharacterNode | undefined {
		return (node ?? this.root).next?.[character];
	}

	find(word: string): boolean | undefined {
		let node = this.root;
		for (const character of word) {
			const nextNode = this.findNext(node, character);
			if (!nextNode)
				return false;
			node = nextNode;
		}
		return node.hasEnding;
	}
}

class Vector2 {
	constructor(public a: number, public b: number) {}
}

class Finder {
	aLength = 0;
	bLength = 0;
	visited: boolean[][];

	constructor(readonly board: string[][]) {
		this.aLength = board.length;
		this.bLength = board[0]?.length ?? 0;
		this.visited = new Array(this.aLength).fill([])
			.map(_ => new Array(this.bLength).fill(false));
	}

	find(words: string[]): string[] {
		const outputs = new Set<string>();
		for (const word of words)
			if (this.findWord(word))
				outputs.add(word);
		return Array.from(outputs);
	}

	findWord(word: string): boolean {
		const roots: Vector2[] = [];
		const characters = Array.from(word);
		for (let a = 0; a < this.aLength; ++a)
			for (let b = 0; b < this.bLength; ++b)
				if (this.board[a]?.[b] === characters[0])
					roots.push(new Vector2(a, b));
		const find = (node: Vector2, characterIndex: number): boolean => {
			const character = characters[characterIndex] ?? '';
			if (this.getCharacter(node) !== character)
				return false;
			if (characterIndex === word.length - 1)
				return true;
			this.setVisited(node, true);
			for (const nextNode of this.getNextNodes(node))
				if (!this.getVisited(nextNode))
					if (find(nextNode, characterIndex + 1))
						return true;
			this.setVisited(node, false);
			return false;
		}
		return roots.some(root => {
			this.clearVisited();
			return find(root, 0)
		});
	}

	private getNextNodes(node: Vector2): Vector2[] {
		const nodes: Vector2[] = [];
		if (node.a < this.aLength - 1)
			nodes.push(new Vector2(node.a + 1, node.b));
		if (0 < node.a)
			nodes.push(new Vector2(node.a - 1, node.b));
		if (node.b < (this.bLength) - 1)
			nodes.push(new Vector2(node.a, node.b + 1));
		if (0 < node.b)
			nodes.push(new Vector2(node.a, node.b - 1));
		return nodes;
	}

	private getCharacter(node: Vector2): string {
		return this.board[node.a]?.[node.b] ?? '';
	}

	private clearVisited() {
		for (let a = 0; a < this.aLength; ++a)
			for (let b = 0; b < this.bLength; ++b) {
				const row = this.visited[a];
				if (row) row[b] = false;
			}
	}

	private setVisited(node: Vector2, status: boolean) {
		const row = this.visited[node.a];
		if (row) row[node.b] = status;
	}

	private getVisited(node: Vector2) {
		return this.visited[node.a]?.[node.b];
	}
}

function findWords(board: string[][], words: string[]): string[] {
	return new Finder(board).find(words);
}


//---

export const findWordsExported = findWords;
export const PrefixTreeExported = PrefixTree;