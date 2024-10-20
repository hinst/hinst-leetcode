import { assertEquals } from '@std/assert';
import { trapExported } from './main.ts';

Deno.test(function addTest() {
	assertEquals(trapExported([0,1,0,2,1,0,1,3,2,1,2,1]), 6);
});

Deno.test(function addTest() {
	assertEquals(trapExported([4,2,0,3,2,5]), 9);
});