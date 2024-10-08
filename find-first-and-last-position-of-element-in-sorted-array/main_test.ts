import { assertEquals } from '@std/assert';
import { searchRangeExported as searchRange } from './main.ts';

Deno.test(function addTest() {
	assertEquals(searchRange([5,7,7,8,8,10], 8), [3,4]);
});
