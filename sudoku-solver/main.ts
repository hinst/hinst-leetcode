type Point = { x: number, y: number };
const DIGITS = '123456789';

class SudokuSolver {
	private flexiblePoints: Point[] = [];
	private flexiblePointsLastIndex: number;
	private existingNumbersCache: Record<string, boolean> = {};

	constructor(private board: string[][]) {
		for (let x = 0; x < 9; ++x)
			for (let y = 0; y < 9; ++y)
				if (board[x][y] === '.')
					this.flexiblePoints.push({x, y});
		this.flexiblePointsLastIndex = this.flexiblePoints.length - 1;
	}

	private clear() {
		for (const digit of DIGITS)
			this.existingNumbersCache[digit] = false;
	}

	private check(): boolean {
		for (let x = 0; x < 9; ++x) {
			this.clear();
			for (let y = 0; y < 9; y++) {
				const item = this.board[x][y];
				if (this.existingNumbersCache[item])
					return false;
				if (item !== '.')
					this.existingNumbersCache[item] = true;
			}
		}
		for (let y = 0; y < 9; ++y) {
			this.clear();
			for (let x = 0; x < 9; x++) {
				const item = this.board[x][y];
				if (this.existingNumbersCache[item])
					return false;
				if (item !== '.')
					this.existingNumbersCache[item] = true;
			}
		}
		for (let overallX = 0; overallX < 3; ++overallX)
			for (let overallY = 0; overallY < 3; ++overallY) {
				this.clear();
				const offsetX = overallX * 3, limitX = offsetX + 3;
				const offsetY = overallY * 3, limitY = offsetY + 3;
				for (let x = offsetX; x < limitX; ++x)
					for (let y = offsetY; y < limitY; ++y) {
						const item = this.board[x][y];
						if (this.existingNumbersCache[item])
							return false;
						if (item !== '.')
							this.existingNumbersCache[item] = true;
					}
			}
		return true;
	}

	solveNext(i: number = 0) {
		const flexiblePoint = this.flexiblePoints[i];
		for (const digit of DIGITS) {
			this.board[flexiblePoint.x][flexiblePoint.y] = digit;
			if (this.check()) {
				if (i === this.flexiblePointsLastIndex || this.solveNext(i + 1))
					return true;
			}
		}
		this.board[flexiblePoint.x][flexiblePoint.y] = '.';
		return false;
	}
}

/** Do not return anything, modify board in-place instead. */
function solveSudoku(board: string[][]): void {
	new SudokuSolver(board).solveNext();
}

function printBoard(board: string[][]) {
	for (let y = 0; y < 9; ++y)
		console.log(board[y].join(''));
}

export const solveSudokuExported = solveSudoku;

const boardInput = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];

console.time('complete');
solveSudoku(boardInput);
console.timeEnd('complete');
printBoard(boardInput);
