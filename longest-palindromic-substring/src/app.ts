function longestPalindrome(s: string): string {
    for (let iLength = s.length; iLength > 0; --iLength) {
        const startLimit = s.length - iLength;
        for (let start = 0; start <= startLimit; ++start) {
            const end = start + iLength;
            // console.log(s.substring(start, end), checkPalindrome(s, start, end - 1));
            if (checkPalindrome(s, start, end - 1))
                return s.substring(start, end);
        }
    }
    return '';
};

function checkPalindrome(s: string, start: number, end: number) {
    while (start < end) {
        if (s[start] !== s[end])
            return false;
        ++start;
        --end;
    }
    return true;
}

console.log(longestPalindrome("babad"));