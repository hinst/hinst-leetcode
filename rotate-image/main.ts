/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
	const countOfLayers = Math.trunc(matrix.length / 2);
	function get(a: { y: number, x: number }) {
		return matrix[a.y][a.x];
	}
	function set(a: { y: number, x: number }, value: number) {
		matrix[a.y][a.x] = value;
	}
	for (let layer = 0; layer < countOfLayers; ++layer) {
		const a = layer;
		const b = matrix.length - layer;
		let counter = 0;
		for (let x = a; x < b - 1; ++x, ++counter) {
			const itemIndex = { y: layer, x: x };
			const rightIndex = { y: layer + counter, x: b - 1 };
			const bottomIndex = { y: matrix.length - layer - 1, x: b - counter - 1 };
			const leftIndex = { y: matrix.length - layer - counter - 1, x: a };
			let itemValue = get(itemIndex);
			let rightValue = get(rightIndex);
			let bottomValue = get(bottomIndex);
			let leftValue = get(leftIndex);
			// console.log({itemValue, rightValue, bottomValue, leftValue});
			[ itemValue, rightValue, bottomValue, leftValue ] = [ leftValue, itemValue, rightValue, bottomValue ];
			// console.log('->', {itemValue, rightValue, bottomValue, leftValue});
			set(itemIndex, itemValue);
			set(rightIndex, rightValue);
			set(bottomIndex, bottomValue);
			set(leftIndex, leftValue);
		}
	}
}

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
