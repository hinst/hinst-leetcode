import { assertEquals } from '@std/assert';
import { permuteExported } from './main.ts';

Deno.test(function addTest() {
	assertEquals(add(2, 3), 5);
});
