import { assertEquals } from '@std/assert';
import { searchPublic as search } from './main.ts';

Deno.test(function addTest() {
	assertEquals(search([4,5,6,7,8,9,0,1,2], 0), 6);
});
