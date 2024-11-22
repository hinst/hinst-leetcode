import { assertEquals } from '@std/assert';
import { mergeEx, sortIntervalsEx } from './main.ts';

Deno.test(function merge() {
	assertEquals(
		sortIntervalsEx(mergeEx([[1,3],[2,6],[8,10],[15,18]])),
		sortIntervalsEx([[1,6],[8,10],[15,18]])
	);
});
Deno.test(function merge() {
	assertEquals(
		sortIntervalsEx(mergeEx([[1,4],[4,5]])),
		sortIntervalsEx([[1,5]])
	);
});
Deno.test(function merge() {
	assertEquals(
		sortIntervalsEx(mergeEx([[4,5],[1,4],[0,1]])),
		sortIntervalsEx([[0,5]])
	);
});
Deno.test(function merge() {
	assertEquals(
		sortIntervalsEx(mergeEx([[2,3],[4,6],[5,7],[3,4]])),
		sortIntervalsEx([[2,7]])
	);
});
