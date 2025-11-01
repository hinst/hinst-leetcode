import { assertEquals } from '@std/assert';
import { trailingZeroesEx } from './main.ts';

Deno.test(function trailingZeroes() {
	assertEquals(trailingZeroesEx(3), 0);
});
Deno.test(function trailingZeroes() {
	assertEquals(trailingZeroesEx(5), 1);
});
Deno.test(function trailingZeroes() {
	assertEquals(trailingZeroesEx(0), 0);
});
