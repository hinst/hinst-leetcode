function generateParenthesis(n: number): string[] {
    n *= 2;
    const results: string[] = [];
    const limit = Math.pow(2, n);
    for (let i = 0; i < limit; i++)
        if (checkValid(i, n))
            results.push(generateSequence(i, n));
    return results;
}

function generateSequence(sequence: number, size: number) {
    let result = '';
    for (let i = 0; i < size; ++i) {
        const x = sequence % 2;
        sequence = Math.trunc(sequence / 2);
        switch (x) {
            case 0: result += '(';
                break;
            case 1: result += ')';
                break;
        }
    }
    return result;
}

function checkValid(sequence: number, size: number) {
    let counter = 0;
    const lastIndex = size - 1;
    for (let i = 0; i < size; ++i) {
        const x = sequence % 2;
        sequence = Math.trunc(sequence / 2);
        switch (x) {
            case 0: ++counter;
                break;
            case 1: --counter;
                break;
        }
        if (counter < 0)
            return false;
        if (i === lastIndex)
            return counter == 0;
    }
}

console.log(generateParenthesis(parseInt(Deno.args[0])));