import { assertEquals } from '@std/assert';
import { isScrambleEx } from './main.ts';

Deno.test(function isScramble() {
	assertEquals(isScrambleEx('great', 'rgeat'), true);
});
Deno.test(function isScramble() {
	assertEquals(isScrambleEx('abcde', 'caebd'), false);
});
