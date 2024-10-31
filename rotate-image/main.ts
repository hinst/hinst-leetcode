/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
	const countOfLayers = Math.trunc(matrix.length / 2);
	function get(a: {y: number, x: number}) {
		return matrix[a.y][a.x];
	}
	for (let layer = 0; layer < countOfLayers; ++layer) {
		const a = layer;
		const b = matrix.length - layer;
		let counter = 0;
		for (let x = a; x < b; ++x, ++counter) {
			const item = matrix[layer][x];
			const itemIndex = { y: layer, x: x };
			const right = matrix[layer + counter][b - 1];
			const rightIndex = { y: layer + counter, x: b - 1 };
			const bottom = matrix[matrix.length - layer - 1][b - counter - 1];
			const bottomIndex = { y: matrix.length - layer - 1, x: b - counter - 1 };
			const left = matrix[matrix.length - layer - counter - 1][a];
			const leftIndex = { y: matrix.length - layer - counter - 1, x: a };
			console.log({item, right, bottom, left});
			const itemValue = get(itemIndex);
			const rightValue = get(rightIndex);
			const bottomValue = get(bottomIndex);
			const leftValue = get(leftIndex);
			console.log({itemValue, rightValue, bottomValue, leftValue});
		}
	}
};

export const rotateExported = rotate;

function convertMatrixToString(matrix: number[][]) {
	return matrix.map(row => row.join()).join('\n');
}

function testVisual(matrix: number[][]) {
	console.log('---');
	console.log(convertMatrixToString(matrix));
	rotate(matrix)
	console.log('-result-');
	console.log(convertMatrixToString(matrix));
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	testVisual([[1,2,3],[4,5,6],[7,8,9]]);
	testVisual([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]);
}
