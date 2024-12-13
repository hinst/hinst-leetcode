function minDistance(word1: string, word2: string): number {
	if (!word1.length)
		return word2.length;
	if (!word2.length)
		return word1.length;
	const matrix: number[][] = new Array(word1.length + 1).fill(undefined)
		.map(_ => new Array(word2.length + 1));
	for (let i = 0; i <= word1.length; ++i)
		matrix[i][0] = i;
	for (let i = 0; i <= word2.length; ++i)
		matrix[0][i] = i;
	for (let y = 1; y <= word1.length; ++y)
		for (let x = 1; x <= word2.length; ++x) {
			const distanceLeft = matrix[y][x - 1];
			const distanceBottom = matrix[y - 1][x];
			const distanceDiagonal = matrix[y - 1][x - 1];
			const characterLeft = word1[y - 1];
			const characterRight = word2[x - 1];
			const characterIsMatched = characterLeft === characterRight;
			const distance = Math.min(
				distanceLeft + 1,
				distanceBottom + 1,
				distanceDiagonal + (characterIsMatched ? 0 : 1)
			);
			matrix[y][x] = distance;
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
	console.log(minDistance('horse', 'ros'));
	console.log(minDistance('intention', 'execution'));
}
