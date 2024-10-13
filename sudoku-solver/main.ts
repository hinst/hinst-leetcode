type Point = { x: number, y: number };
const DIGITS = '123456789';

function checkSudoku(board: string[][]): boolean {
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
			const offsetX = overallX * 3;
			const limitX = offsetX + 3;
			const offsetY = overallY * 3;
			const limitY = offsetY + 3;
			for (let x = offsetX; x < limitX; ++x)
				for (let y = offsetY; y < limitY; ++y) {
					const item = board[x][y];
					if (numbers.has(item))
						return false;
					if (item !== '.')
						numbers.add(item);
				}
		}
	return true;
}

/** Do not return anything, modify board in-place instead. */
function solveSudoku(board: string[][]): void {
	const flexiblePoints: Point[] = [];
	for (let x = 0; x < 9; ++x)
		for (let y = 0; y < 9; ++y)
			if (board[x][y] === '.')
				flexiblePoints.push({x, y});
	const flexiblePointsLastIndex = flexiblePoints.length - 1;
	function solveNext(i: number) {
		const flexiblePoint = flexiblePoints[i];
		for (const digit of DIGITS) {
			board[flexiblePoint.x][flexiblePoint.y] = digit;
			if (checkSudoku(board)) {
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

solveSudoku(boardInput);
printBoard(boardInput);