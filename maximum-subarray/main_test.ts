import { assertEquals } from '@std/assert';
import { maxSubArrayEx } from './main.ts';

Deno.test(function maxSubArray() {
	assertEquals(maxSubArrayEx([-2,1,-3,4,-1,2,1,-5,4]), 6);
});
Deno.test(function maxSubArray() {
	assertEquals(maxSubArrayEx([1]), 1);
});
