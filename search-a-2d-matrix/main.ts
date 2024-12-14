function searchMatrix(matrix: number[][], target: number): boolean {
	for (let y = 0; y < matrix.length; ++y) {
		if (y < matrix.length - 1 && matrix[y + 1][0] < target)
			continue;
		if (target < matrix[y][0])
			continue;
		for (let x = 0; x < matrix[y].length; ++x)
			if (matrix[y][x] === target)
				return true;
	}
	return false;
}

if (import.meta.main) {
	console.log();
}
