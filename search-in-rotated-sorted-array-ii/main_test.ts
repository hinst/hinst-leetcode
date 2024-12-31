import { assertEquals } from '@std/assert';
import { findTurningPositionEx } from './main.ts';

Deno.test(function findTurningPosition() {
	assertEquals(findTurningPositionEx([2,5,6,0,0,1,2]), 3);
});
Deno.test(function findTurningPosition() {
	assertEquals(findTurningPositionEx([1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1]), 14);
});
