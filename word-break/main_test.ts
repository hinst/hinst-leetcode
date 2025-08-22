import { assertEquals } from '@std/assert';
import { wordBreakEx } from './main.ts';

Deno.test(function wordBreak() {
	const s = "leetcode", wordDict = ["leet","code"];
	assertEquals(wordBreakEx(s, wordDict), true);
});
Deno.test(function wordBreak() {
	const s = "applepenapple", wordDict = ["apple","pen"]
	assertEquals(wordBreakEx(s, wordDict), true);
});
Deno.test(function wordBreak() {
	const s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
	assertEquals(wordBreakEx(s, wordDict), false);
});
