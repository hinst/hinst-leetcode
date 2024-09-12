const MAX_UINT32 = 4294967295;
const MAX_UINT16 = 65535;

function convert(s: string, numRows: number): string {
    const rows: Uint32Array[] = new Array(numRows).fill(undefined)
        .map(() => new Uint32Array(s.length));
    let x = 0;
    let y = 0;
    let ySpeed = numRows > 1 ? 1 : 0;
    for (const character of s) {
        rows[y][x] = character.charCodeAt(0);
        if (numRows > 1)
            if (y >= numRows - 1)
                ySpeed = -1;
            else if (y <= 0)
                ySpeed = 1;
        y += ySpeed;
        if (ySpeed < 1)
            x += 1;
    }
    const result = new Uint32Array(s.length);
    let resultIndex = 0;
    for (y = 0; y < rows.length; y++) {
        rows[y][x + 1] = MAX_UINT32;
        for (const character of rows[y]) {
            if (character === MAX_UINT32)
                break;
            if (character != 0) {
                result[resultIndex] = character;
                resultIndex++;
            }
        }
    }
    return String.fromCodePoint(...result);
};

console.log(convert('123456789X', 3));
