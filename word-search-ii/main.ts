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
		return words.filter(word => this.findWord(word));
	}

	findWord(word: string): boolean {
		const roots: Vector2[] = [];
		const characters = Array.from(word);
		for (let a = 0; a < this.aLength; ++a)
			for (let b = 0; b < this.bLength; ++b)
				if (this.board[a]?.[b] === characters[0])
					roots.push(new Vector2(a, b));
		const find = (node: Vector2, characterIndex: number): boolean => {
			this.setVisited(node);
			if (characterIndex === word.length)
				return true;
			const character = characters[characterIndex] ?? '';
			for (const nextNode of this.getNextNodes(node))
				if (!this.getVisited(nextNode) && this.getCharacter(nextNode) === character)
					if (find(nextNode, characterIndex + 1))
						return true;
			return false;
		}
		return roots.some(root => {
			this.clearVisited();
			return find(root, 1)
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

	private setVisited(node: Vector2) {
		const row = this.visited[node.a];
		if (row) row[node.b] = true;
	}

	private getVisited(node: Vector2) {
		return this.visited[node.a]?.[node.b];
	}
}

function findWords(board: string[][], words: string[]): string[] {
	return new Finder(board).find(words);
}

const board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"];
console.log(findWords(board, words).sort());