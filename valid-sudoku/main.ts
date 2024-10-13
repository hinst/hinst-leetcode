function isValidSudoku(board: string[][]): boolean {
	for (let x = 0; x < 9; ++x) {
		const numbers = new Set<string>();
		for (let y = 0; y < 9; y++) {
			const item = board[x][y];
			if (numbers.has(item))
				return false;
			if (item !== '.')
				numbers.add(item);
		}
	}
	for (let y = 0; y < 9; ++y) {
		const numbers = new Set<string>();
		for (let x = 0; x < 9; x++) {
			const item = board[x][y];
			if (numbers.has(item))
				return false;
			if (item !== '.')
				numbers.add(item);
		}
	}
	for (let overallX = 0; overallX < 3; ++overallX)
		for (let overallY = 0; overallY < 3; ++overallY) {
			const numbers = new Set<string>();
			for (let x = (overallX * 3); x < (overallX * 3) + 3; ++x)
				for (let y = (overallY * 3); y < (overallY * 3) + 3; ++y) {
					const item = board[x][y];
					if (numbers.has(item))
						return false;
					if (item !== '.')
						numbers.add(item);
				}
		}
	return true;
}

export const isValidSudokuExported = isValidSudoku;