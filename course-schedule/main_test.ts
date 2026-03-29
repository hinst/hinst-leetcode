import { assertEquals } from '@std/assert';
import { canFinishPublic } from './main.ts';

Deno.test(function canFinish() {
	const numCourses = 2, prerequisites = [[1,0]];
	assertEquals(canFinishPublic(numCourses, prerequisites), true);
});

Deno.test(function canFinish() {
	const numCourses = 2, prerequisites = [[1,0],[0,1]];
	assertEquals(canFinishPublic(numCourses, prerequisites), false);
});
