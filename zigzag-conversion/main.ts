function convert(s: string, numRows: number): string {
    const rows: string[] = new Array(numRows).fill('');
    let x = 0;
    let y = 0;
    let isDown = true;
    for (const character of s) {
        while (rows[y].length < x)
            rows[y] += '\0';
        rows[y] += character;
        if (numRows > 1)
            if (isDown) {
                y += 1;
                if (y >= numRows) {
                    y -= 2;
                    isDown = false;
                    x++;
                }
            } else {
                y -=1;
                x++;
                if (y == 0)
                    isDown = true;
            }
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

console.log(convert('PAYPALISHIRING', 1));
