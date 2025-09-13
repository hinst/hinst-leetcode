import { assertEquals } from '@std/assert';
import { findMinEx } from './main.ts';

Deno.test(function addTest() {
	assertEquals(findMinEx([3,4,5,1,2]), 1);
});

Deno.test(function addTest() {
	assertEquals(findMinEx([4,5,6,7,0,1,2]), 0);
});

Deno.test(function addTest() {
	assertEquals(findMinEx([11,13,15,17]), 11);
});

Deno.test(function addTest() {
	assertEquals(findMinEx([10,1,10,10,10]), 1);
});

Deno.test(function addTest() {
	assertEquals(findMinEx([1,2,2,2,2,0]), 0);
});
