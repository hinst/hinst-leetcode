/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
	const countOfLayers = Math.trunc(matrix.length / 2);
	for (let layer = 0; layer < countOfLayers; ++layer) {
		const a = layer;
		const b = matrix.length - layer;
		for (let x = a; x < b; ++x) {
			const item = matrix[layer][x];
			console.log(item);
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
