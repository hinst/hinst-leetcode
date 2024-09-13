function convert(s: string, numRows: number): string {
    const rows: string[] = new Array(numRows).fill('');
    let y = 0;
    let ySpeed = numRows > 1 ? 1 : 0;
    for (const character of s) {
        rows[y] += character;
        if (numRows > 1)
            if (y >= numRows - 1) {
                ySpeed = -1;
            } else if (y <= 0) {
                if (ySpeed < 0)
                    ySpeed = 1;
            }
        y += ySpeed;
    }
    return rows.join('');
};

console.log(convert('123456789X', 4));
