import { assertEquals } from '@std/assert';
import { maxPointsEx, Point } from './main.ts';

Deno.test(function maxPoints() {
	const points: Point[] = [[1,1],[2,2],[3,3]];
	assertEquals(maxPointsEx(points), 3);
});

Deno.test(function maxPoints() {
	const points: Point[] = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]];
	assertEquals(maxPointsEx(points), 4);
});
