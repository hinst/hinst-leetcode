import { lengthOfLongestSubstring } from "./solution";

function test(s: string, expectedOutput: number) {
    const output = lengthOfLongestSubstring(s);
    if (output != expectedOutput)
        console.error(s, output, '!=', expectedOutput);
}

test("abcabcbb", 3);
test("bbbbb", 1);
test("pwwkew", 3);