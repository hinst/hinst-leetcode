import { assert, assertEquals } from '@std/assert';
import { findPeakElementEx } from './main.ts';

Deno.test(function findPeakElement() {
	assertEquals(findPeakElementEx([1,2,3,1]), 2);
});

Deno.test(function findPeakElement() {
	const peak = findPeakElementEx([1,2,1,3,5,6,4]);
	assert(peak === 1 || peak === 5);
});
