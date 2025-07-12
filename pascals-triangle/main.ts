function generate(numRows: number): number[][] {
	const rows = [[1]];
	for (let iRow = 1; iRow < numRows; ++iRow) {
		const lastRow = rows[rows.length - 1];
		const row: number[] = [];
		for (let i = 0; i <= lastRow.length; ++i) {
			let targetValue = 1;
			const isBorder = i === 0 || i === lastRow.length;
			if (!isBorder)
				targetValue = lastRow[i - 1] + lastRow[i];
			row.push(targetValue);
		}
		rows.push(row);
	}
	return rows;
}

if (import.meta.main) {
	console.log(generate(5));
}
