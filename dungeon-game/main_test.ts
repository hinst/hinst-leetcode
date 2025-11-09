import { assertEquals } from '@std/assert';
import { calculateMinimumHpEx } from './main.ts';

Deno.test(function calculateMinimumHp() {
	const dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]];
	assertEquals(calculateMinimumHpEx(dungeon), 7);
});
Deno.test(function calculateMinimumHp() {
	const dungeon = [[0]];
	assertEquals(calculateMinimumHpEx(dungeon), 1);
});
Deno.test(function calculateMinimumHp_37() {
	const dungeon = [[3,0,-3],[-3,-2,-2],[3,1,-3]];
	assertEquals(calculateMinimumHpEx(dungeon), 1);
});
