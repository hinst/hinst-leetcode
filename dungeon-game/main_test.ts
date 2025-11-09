import { assertEquals } from '@std/assert';
import { calculateMinimumHpEx } from './main.ts';

Deno.test(function calculateMinimumHp() {
	const dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]];
	assertEquals(calculateMinimumHpEx(dungeon), 7);
});
