function numIslands(grid: string[][]): number {
	let count = 0;
	for (let rowIndex = 0; rowIndex < grid.length; ++rowIndex)
		for (let columnIndex = 0; columnIndex < grid[rowIndex].length; ++columnIndex)
			if (grid[rowIndex][columnIndex] === '1') {
				++count;
				sink(grid, rowIndex, columnIndex);
			}
	return count;
}

function sink(grid: string[][], row: number, column: number) {
	grid[row][column] = '0';
	if (grid[row - 1] && grid[row - 1][column] === '1')
		sink(grid, row - 1, column);
	if (grid[row + 1] && grid[row + 1][column] === '1')
		sink(grid, row + 1, column);
	if (grid[row][column - 1] === '1')
		sink(grid, row, column - 1);
	if (grid[row][column + 1] === '1')
		sink(grid, row, column + 1);
}

if (import.meta.main) {
	const grid1 = [
		["1","1","1","1","0"],
		["1","1","0","1","0"],
		["1","1","0","0","0"],
		["0","0","0","0","0"]
	];
	const grid3 = [
		["1","1","0","0","0"],
		["1","1","0","0","0"],
		["0","0","1","0","0"],
		["0","0","0","1","1"]
	]
	console.log(numIslands(grid3));
}
