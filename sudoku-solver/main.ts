type Point = { x: number, y: number };
const DIGITS = '123456789';

class SudokuSolver {
	private readonly flexiblePoints: Point[] = [];
	private readonly flexiblePointsLastIndex: number;
	private readonly existingNumbersCache: Record<string, boolean> = {};
	private readonly overallOffsets: { x: number, y: number, xL: number, yL: number }[] = [];

	constructor(private board: string[][]) {
		for (let x = 0; x < 9; ++x)
			for (let y = 0; y < 9; ++y)
				if (board[x][y] === '.')
					this.flexiblePoints.push({x, y});
		this.flexiblePointsLastIndex = this.flexiblePoints.length - 1;
		for (let overallX = 0; overallX < 3; ++overallX) {
			for (let overallY = 0; overallY < 3; ++overallY) {
				const x = overallX * 3;
				const y = overallY * 3;
				const xL = x + 3;
				const yL = y + 3;
				this.overallOffsets.push({x, y, xL, yL});
			}
		}
		console.log(this.overallOffsets);
	}

	private clear(cache: Record<string, boolean>) {
		for (const digit of DIGITS)
			cache[digit] = false;
	}

	private check(skipPoint: Point): boolean {
		for (let x = 0; x < 9; ++x) {
			if (skipPoint.x < x)
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
			if (skipPoint.y < y)
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
		for (const offset of this.overallOffsets) {
			this.clear(this.existingNumbersCache);
			const xA = offset.x;
			const yA = offset.y;
			const xL = offset.xL;
			const yL = offset.yL;
			for (let x = xA; x < xL; ++x)
				for (let y = yA; y < yL; ++y) {
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
		const overallX = Math.trunc(flexiblePoint.x / 3);
		const overallY = Math.trunc(flexiblePoint.y / 3);
		const offsetX = overallX * 3;
		const offsetY = overallY * 3;
		const limitX = offsetX + 2;
		const limitY = offsetY + 2;
		for (let x = offsetX; x < limitX; ++x)
			for (let y = offsetY; y < limitY; ++y)
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
