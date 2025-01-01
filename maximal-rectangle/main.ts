function largestRectangleArea(heights: number[]): number {
	let largestArea = 0;
	for (let i = 0; i < heights.length; ++i) {
		const height = heights[i];
		if (height === heights[i - 1])
			continue;
		let width = 1;
		for (let w = i + 1; w < heights.length; ++w)
			if (height <= heights[w])
				++width;
			else
				break;
		for (let w = i - 1; w >= 0; --w)
			if (height <= heights[w])
				++width;
			else
				break;
		const area = height * width;
		if (largestArea < area)
			largestArea = area;
	}
	return largestArea;
}

function maximalRectangle(matrixText: string[][]): number {
	const matrix = matrixText.map(column => column.map(cell => parseInt(cell)));
	const height = matrix.length;
	const width = matrix[0]?.length || 0;
	let maxArea = 0;
	for (let y = 1; y < height; ++y)
		for (let x = 0; x < width; ++x)
			if (matrix[y][x])
				matrix[y][x] = matrix[y - 1][x] + 1;
	for (let y = 0; y < height; ++y) {
		const area = largestRectangleArea(matrix[y]);
		if (maxArea < area)
			maxArea = area;
	}
	return maxArea;
}


if (import.meta.main) {
	const matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]];
	console.log(maximalRectangle(matrix));
}
