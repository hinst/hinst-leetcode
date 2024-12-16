import { assertEquals } from '@std/assert';
import { existEx } from './main.ts';

Deno.test(function exist() {
	const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED";
	assertEquals(existEx(board, word), true);
});
Deno.test(function exist() {
	const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
	assertEquals(existEx(board, word), true);
});
Deno.test(function exist() {
	const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB";
	assertEquals(existEx(board, word), false);
});
Deno.test(function exist() {
	const board = [["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], word = "ABCESEEEFS";
	assertEquals(existEx(board, word), true);
});
