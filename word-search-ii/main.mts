class CharacterNode {
	constructor(readonly previous: CharacterNode | undefined, readonly character: string) {
	}
	count: number = 0;
	next?: Record<string, CharacterNode>;
	hasEnding?: boolean;

	getWord() {
		let word = '';
		let node: CharacterNode | undefined = this;
		do {
			word = node.character + word;
			node = node.previous;
		} while (node);
		return word;
	}
}

class PrefixTree {
	root: CharacterNode = new CharacterNode(undefined, '');

	add(word: string) {
		let node = this.root;
		++node.count;
		for (const character of word) {
			if (!node.next)
				node.next = {};
			let nextNode = node.next[character];
			if (!nextNode) {
				nextNode = new CharacterNode(node, character);
				node.next[character] = nextNode;
			}
			node = nextNode;
			++node.count;
		}
		node.hasEnding = true;
	}

	delete(word: string): boolean {
		let node = this.root;
		const nodes: CharacterNode[] = [node];
		for (const character of word) {
			const nextNode = node.next?.[character];
			if (!nextNode)
				return false;
			node = nextNode;
		}
		if (!node.hasEnding)
			return false;
		node.hasEnding = false;
		for (let i = nodes.length - 1; i >= 0; --i) {
			const node = nodes[i];
			if (!node) throw new Error('Need node'); // should never happen
			node.count--;
			if (node.count <= 0 && i > 0) {
				const previousNode = nodes[i - 1];
				if (previousNode?.next)
					delete previousNode.next[node.character];
			}
		}
		return true;
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
	words = new PrefixTree();

	constructor(readonly board: string[][], words: string[]) {
		this.aLength = board.length;
		this.bLength = board[0]?.length ?? 0;
		this.visited = new Array(this.aLength).fill([])
			.map(_ => new Array(this.bLength).fill(false));
		for (const word of words)
			this.words.add(word);
	}

	find(): string[] {
		const allOutputs: string[] = [];
		for (let a = 0; a < this.aLength; ++a)
			for (let b = 0; b < this.bLength; ++b) {
				const position = new Vector2(a, b);
				const node = this.words.findNext(undefined, this.getCharacter(position));
				this.clearVisited();
				if (node)
					this.findNext(position, node, allOutputs);
			}
		return allOutputs;
	}

	findNext(position: Vector2, node: CharacterNode, outputs: string[]) {
		if (this.checkVisited(position))
			return;
		this.setVisited(position, true);
		if (node.hasEnding && node.count > 0) {
			const word = node.getWord();
			outputs.push(word);
			this.words.delete(word);
		}
		const nextPositions = this.getNextPositions(position);
		for (const nextPosition of nextPositions) {
			const nextCharacter = this.getCharacter(nextPosition);
			const nextNode = this.words.findNext(node, nextCharacter);
			if (nextNode)
				this.findNext(nextPosition, nextNode, outputs);
		}
		this.setVisited(position, false);
	}

	private getNextPositions(position: Vector2): Vector2[] {
		const positions: Vector2[] = [];
		if (position.a < this.aLength - 1)
			positions.push(new Vector2(position.a + 1, position.b));
		if (0 < position.a)
			positions.push(new Vector2(position.a - 1, position.b));
		if (position.b < (this.bLength) - 1)
			positions.push(new Vector2(position.a, position.b + 1));
		if (0 < position.b)
			positions.push(new Vector2(position.a, position.b - 1));
		return positions;
	}

	private getCharacter(position: Vector2): string {
		return this.board[position.a]?.[position.b] ?? '';
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

	private checkVisited(node: Vector2) {
		return this.visited[node.a]?.[node.b];
	}
}

function findWords(board: string[][], words: string[]): string[] {
	return new Finder(board, words).find();
}


//---

export const findWordsExported = findWords;
export const PrefixTreeExported = PrefixTree;