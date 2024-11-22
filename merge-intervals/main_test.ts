import { assertEquals } from '@std/assert';
import { mergeEx } from './main.ts';

Deno.test(function merge() {
	assertEquals(mergeEx([[1,3],[2,6],[8,10],[15,18]]), [[1,6],[8,10],[15,18]]);
});
Deno.test(function merge() {
	assertEquals(mergeEx([[1,4],[4,5]]), [[1,5]]);
});
