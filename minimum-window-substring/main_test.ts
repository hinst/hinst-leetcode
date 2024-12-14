import { assertEquals } from '@std/assert';
import { minWindowEx } from './main.ts';

Deno.test(function minWindow() {
	assertEquals(minWindowEx('ADOBECODEBANC', 'ABC'), 'BANC');
});
Deno.test(function minWindow() {
	assertEquals(minWindowEx('a', 'aa'), '');
});
