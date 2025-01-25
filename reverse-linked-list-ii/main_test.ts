import { assertEquals } from '@std/assert';
import { createArray, createList, reverseBetweenEx } from './main.ts';

function test(a: number[], left: number, right: number, b: number[]) {
	assertEquals(createArray(reverseBetweenEx(createList(a), left, right)), b);
}
Deno.test(function testReverseBetween() {
	test([1,2,3,4,5], 2, 4, [1,4,3,2,5]);
});
Deno.test(function testReverseBetween() {
	test([1,2,3,4,5], 2, 2, [1,2,3,4,5]);
});
Deno.test(function testReverseBetween() {
	test([1,2,3,4,5], 3, 4, [1,2,4,3,5]);
});
Deno.test(function testReverseBetween() {
	test([1,2,3,4,5], 1, 2, [2,1,3,4,5]);
});
