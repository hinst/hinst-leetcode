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

	private clear(cache: Record<string, boolean>) {
		for (const digit of DIGITS)
			cache[digit] = false;
	}

	private check(skipPoint: Point): boolean {
		for (let x = 0; x < 9; ++x) {
			if (x === skipPoint.x)
				continue;
			this.clear(this.existingNumbersCache);
			for (let y = 0; y < 9; y++) {
				const item = this.board[x][y];
				if (this.existingNumbersCache[item])
					return false;
				if (item !== '.')
					this.existingNumbersCache[item] = true;
			}
		}
		for (let y = 0; y < 9; ++y) {
			if (y === skipPoint.y)
				continue;
			this.clear(this.existingNumbersCache);
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
				this.clear(this.existingNumbersCache);
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
		const availableNumbers = new Set<string>(DIGITS);
		for (let x = 0; x < 9; ++x)
			availableNumbers.delete(this.board[x][flexiblePoint.y]);
		for (let y = 0; y < 9; ++y)
			availableNumbers.delete(this.board[flexiblePoint.x][y]);
		const offsetX = (Math.trunc(flexiblePoint.x / 3)) * 3;
		const offsetY = (Math.trunc(flexiblePoint.y / 3)) * 3;
		for (let x = offsetX; x < offsetX + 3; ++x)
			for (let y = offsetY; y < offsetY + 3; ++y)
				availableNumbers.delete(this.board[x][y]);
		for (const digit of availableNumbers) {
			this.board[flexiblePoint.x][flexiblePoint.y] = digit;
			if (this.check(flexiblePoint)) {
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

printBoard(boardInput);
console.time('complete');
solveSudoku(boardInput);
console.timeEnd('complete');
printBoard(boardInput);
