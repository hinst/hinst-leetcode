function convert(s: string, numRows: number): string {
    const rows: string[] = new Array(numRows).fill('');
    const characters = new Uint16Array(s.length).fill(' '.charCodeAt(0));
    let x = 0;
    let y = 0;
    let ySpeed = numRows > 1 ? 1 : 0;
    const blockSize = numRows + Math.max(0, numRows - 2);
    const blockWidth = numRows - 1;
    const blockCount = s.length / blockSize;
    const leftoverSize = s.length % blockSize;
    const tailSize = Math.max(0, leftoverSize - numRows);
    console.log({ blockSize, blockCount, leftoverSize });
    const rowWidths = new Array(numRows).fill(Math.floor(blockCount) * blockWidth);
    for (let i = 0; i < leftoverSize - tailSize; i++)
        rowWidths[i] += 1;
    for (let i = 0; i < tailSize; i++)
        rowWidths[numRows - i - 2] += i + 1;

    console.log({ rowWidths });
    for (const character of s) {
        if (rows[y].length < x)
            rows[y] += ' '.repeat(x - rows[y].length);
        rows[y] += character;
        if (numRows > 1)
            if (y >= numRows - 1)
                ySpeed = -1;
            else if (y <= 0)
                ySpeed = 1;
        y += ySpeed;
        if (ySpeed < 1)
            x += 1;
    }
    let result = '';
    for (y = 0; y < rows.length; y++) {
        console.log(rows[y]);
        for (const character of rows[y]) {
            if (character != ' ')
                result += character;
        }
    }
    console.log(String.fromCodePoint(...characters));
    return result;
};

console.log(convert('123456789ABC', 4));
