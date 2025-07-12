import { assertEquals } from '@std/assert';
import { numDistinctEx } from './main.ts';

Deno.test(function numDistinct() {
	const s = "rabbbit", t = "rabbit";
	assertEquals(numDistinctEx(s, t), 3);
});
