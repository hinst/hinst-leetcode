type Point = { x: number, y: number };
const DIGITS = '123456789';

class SudokuChecker {
	numbers: Record<string, boolean> = {};

	constructor() {
		this.clear();
	}

	clear() {
		for (const digit of DIGITS)
			this.numbers[digit] = false;
	}

	check(board: string[][]): boolean {
		for (let x = 0; x < 9; ++x) {
			this.clear();
			for (let y = 0; y < 9; y++) {
				const item = board[x][y];
				if (this.numbers[item])
					return false;
				if (item !== '.')
					this.numbers[item] = true;
			}
		}
		for (let y = 0; y < 9; ++y) {
			this.clear();
			for (let x = 0; x < 9; x++) {
				const item = board[x][y];
				if (this.numbers[item])
					return false;
				if (item !== '.')
					this.numbers[item] = true;
			}
		}
		for (let overallX = 0; overallX < 3; ++overallX)
			for (let overallY = 0; overallY < 3; ++overallY) {
				this.clear();
				const offsetX = overallX * 3;
				const limitX = offsetX + 3;
				const offsetY = overallY * 3;
				const limitY = offsetY + 3;
				for (let x = offsetX; x < limitX; ++x)
					for (let y = offsetY; y < limitY; ++y) {
						const item = board[x][y];
						if (this.numbers[item])
							return false;
						if (item !== '.')
							this.numbers[item] = true;
					}
			}
		return true;
	}

}

/** Do not return anything, modify board in-place instead. */
function solveSudoku(board: string[][]): void {
	const flexiblePoints: Point[] = [];
	for (let x = 0; x < 9; ++x)
		for (let y = 0; y < 9; ++y)
			if (board[x][y] === '.')
				flexiblePoints.push({x, y});
	const flexiblePointsLastIndex = flexiblePoints.length - 1;
	const checker = new SudokuChecker();
	function solveNext(i: number) {
		const flexiblePoint = flexiblePoints[i];
		for (const digit of DIGITS) {
			board[flexiblePoint.x][flexiblePoint.y] = digit;
			if (checker.check(board)) {
				if (i === flexiblePointsLastIndex)
					return true;
				else if (solveNext(i + 1))
					return true;
			}
		}
		board[flexiblePoint.x][flexiblePoint.y] = '.';
		return false;
	}
	solveNext(0);
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
