import { assertEquals } from '@std/assert';
import { firstMissingPositiveExported } from './main.ts';

Deno.test(function firstMissingPositiveTest() {
	assertEquals(firstMissingPositiveExported([1,2,0]), 3);
});

Deno.test(function firstMissingPositiveTest() {
	assertEquals(firstMissingPositiveExported([3,4,-1,1]), 2);
});

Deno.test(function firstMissingPositiveTest() {
	assertEquals(firstMissingPositiveExported([7,8,9,11,12]), 1);
});

Deno.test(function firstMissingPositiveTest() {
	assertEquals(firstMissingPositiveExported([0,2,2,1,1]), 3);
});

Deno.test(function firstMissingPositiveTest() {
	assertEquals(firstMissingPositiveExported([1,2,2,1,3,1,0,4,0]), 5);
});
