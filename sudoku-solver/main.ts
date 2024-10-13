type CheckResult = { isComplete: boolean, isValid: boolean };

function checkSudoku(board: string[][]): CheckResult {
	let isComplete = true;
	let isValid = true;
	for (let x = 0; x < 9; ++x) {
		const numbers = new Set<string>();
		for (let y = 0; y < 9; y++) {
			const item = board[x][y];
			if (isValid && numbers.has(item))
				isValid = false;
			if (item !== '.')
				numbers.add(item);
			else
				isComplete = false;
		}
	}
	for (let y = 0; y < 9; ++y) {
		const numbers = new Set<string>();
		for (let x = 0; x < 9; x++) {
			const item = board[x][y];
			if (isValid && numbers.has(item))
				isValid = false;
			if (item !== '.')
				numbers.add(item);
			else
				isComplete = false;
		}
	}
	for (let overallX = 0; overallX < 3; ++overallX)
		for (let overallY = 0; overallY < 3; ++overallY) {
			const numbers = new Set<string>();
			const offsetX = overallX * 3;
			const limitX = offsetX + 3;
			const offsetY = overallY * 3;
			const limitY = offsetY + 3;
			for (let x = offsetX; x < limitX; ++x)
				for (let y = offsetY; y < limitY; ++y) {
					const item = board[x][y];
					if (isValid && numbers.has(item))
						isValid = false;
					if (item !== '.')
						numbers.add(item);
				}
		}
	return {isComplete, isValid};
}

/** Do not return anything, modify board in-place instead. */
function solveSudoku(board: string[][]): void {

}

export const solveSudokuExported = solveSudoku;