type Point = { x: number, y: number };

function minDistance(word1: string, word2: string): number {
	if (!word1.length)
		return word2.length;
	if (!word2.length)
		return word1.length;
	const matrix: number[][] = new Array(word1.length + 1).fill(undefined)
		.map(_ => new Array(word2.length + 1));
	const points: Point[] = [];
	for (let i = 0; i <= word1.length; ++i) {
		matrix[i][0] = i;
		points.push({x: 1, y: i});
	}
	for (let i = 0; i <= word2.length; ++i) {
		matrix[0][i] = i;
		points.push({x: i, y: 1});
	}
	while (points.length) {
		const currentPoints = points.slice(0);
		points.length = 0;
		for (const point of currentPoints) {
			if (matrix[point.y][point.x] != null)
				continue;
			const distanceLeft = matrix[point.y][point.x - 1];
			const distanceBottom = matrix[point.y - 1][point.x];
			const distanceDiagonal = matrix[point.y - 1][point.x - 1];
			const characterLeft = word1[point.y - 1];
			const characterRight = word2[point.x - 1];
			const characterIsMatched = characterLeft === characterRight;
			const distance = Math.min(
				distanceLeft + 1,
				distanceBottom + 1,
				distanceDiagonal + (characterIsMatched ? 0 : 1)
			);
			matrix[point.y][point.x] = distance;
			if (point.x < point.y) {
				if (point.x < word2.length)
					points.push({x: point.x + 1, y: point.y});
			} else {
				if (point.y < word1.length)
					points.push({x: point.x, y: point.y + 1});
			}
		}
	}
	return matrix[word1.length][word2.length];
}

function getMatrixText(matrix: number[][]) {
	let text = '';
	for (let i = matrix.length - 1; i >= 0; --i) {
		text += matrix[i].join(' ') + '\n';
	}
	return text;
}

if (import.meta.main) {
	console.log(minDistance('a', 'ab'));
	// console.log(minDistance('intention', 'execution'));
}
