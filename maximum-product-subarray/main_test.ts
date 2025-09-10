import { assertEquals } from '@std/assert';
import { maxProductEx } from './main.ts';

Deno.test(function addTest() {
	assertEquals(maxProductEx([2,3,-2,4]), 6);
});

Deno.test(function addTest() {
	assertEquals(maxProductEx([-2,0,-1]), 0);
});

Deno.test(function addTest() {
	assertEquals(maxProductEx([-2]), -2);
});
