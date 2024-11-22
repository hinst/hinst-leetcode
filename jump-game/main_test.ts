import { assertEquals } from '@std/assert';
import { canJumpEx } from './main.ts';

Deno.test(function canJump() {
	assertEquals(canJumpEx([2,3,1,1,4]), true);
});
Deno.test(function canJump() {
	assertEquals(canJumpEx([3,2,1,0,4]), false);
});
