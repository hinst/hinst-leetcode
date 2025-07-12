function getRow(numRows: number): number[] {
	let lastRow = [1];
	for (let iRow = 0; iRow < numRows; ++iRow) {
		const row: number[] = [];
		for (let i = 0; i <= lastRow.length; ++i) {
			let targetValue = 1;
			const isBorder = i === 0 || i === lastRow.length;
			if (!isBorder)
				targetValue = lastRow[i - 1] + lastRow[i];
			row.push(targetValue);
		}
		lastRow = row;
	}
	return lastRow;
}

if (import.meta.main) {
	console.log(getRow(5));
}
