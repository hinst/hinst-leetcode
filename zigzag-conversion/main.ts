function convert(s: string, numRows: number): string {
    const rows: string[] = new Array(numRows).fill('');
    let x = 0;
    let y = 0;
    let ySpeed = numRows > 1 ? 1 : 0;
    for (const character of s) {
        while (rows[y].length < x)
            rows[y] += '\0';
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
        for (const character of rows[y]) {
            if (character != '\0')
                result += character;
        }
    }
    return result;
};

console.log(convert('123456789X', 4));
