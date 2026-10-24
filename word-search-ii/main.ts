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
		const firstCharacter = word.charAt(0);
		for (let a = 0; a < this.board.length; ++a)
			for (let b = 0; b < (this.board[a]?.length ?? 0); ++b)
				if (this.board[a]?.[b] === firstCharacter)
					roots.push(new Vector2(a, b));
	}
}

function findWords(board: string[][], words: string[]): string[] {
	return new Finder(board).find(words);
}