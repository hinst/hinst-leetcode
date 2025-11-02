export function formatMatrix<T>(array: T[][]) {
	const texts = array.map(row => row.map(item => '' + item));
	let maxWidth = 0;
	for (const text of texts.flatMap(item => item))
		if (maxWidth < text.length)
			maxWidth = text.length;
	for (const row of texts)
		for (let i = 0; i < row.length; ++i)
			while (row[i].length < maxWidth)
				row[i] = ' ' + row[i];
	return texts.map(row => row.join(' ')).join('\n');
}