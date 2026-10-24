class Vector2 {
	constructor(public a: number, public b: number) {}
}

class Finder {
	constructor(readonly board: string[][]) {
	}

	find(words: string[]): string[] {
		return words.filter(word => this.findWord(word));
	}

	findWord(word: string): boolean {
		const roots: Vector2[] = [];
		const characters = Array.from(word);
		for (let a = 0; a < this.board.length; ++a)
			for (let b = 0; b < (this.board[a]?.length ?? 0); ++b)
				if (this.board[a]?.[b] === characters[0])
					roots.push(new Vector2(a, b));
		const find = (node: Vector2, characterIndex: number): boolean => {
			if (characterIndex === word.length)
				return true;
			const character = characters[characterIndex] ?? '';
			for (const nextNode of this.getNextNodes(node))
				if (this.getCharacter(nextNode) === character)
					if (find(nextNode, characterIndex + 1))
						return true;
			return false;
		}
		return roots.some(root => find(root, 1));
	}

	getNextNodes(node: Vector2): Vector2[] {
		const nodes: Vector2[] = [];
		if (node.a < this.board.length - 1)
			nodes.push(new Vector2(node.a + 1, node.b));
		if (0 < node.a)
			nodes.push(new Vector2(node.a - 1, node.b));
		if (node.b < (this.board[0]?.length ?? 0) - 1)
			nodes.push(new Vector2(node.a, node.b + 1));
		if (0 < node.b)
			nodes.push(new Vector2(node.a, node.b - 1));
		return nodes;
	}

	getCharacter(node: Vector2): string {
		return this.board[node.a]?.[node.b] ?? '';
	}
}

function findWords(board: string[][], words: string[]): string[] {
	return new Finder(board).find(words);
}