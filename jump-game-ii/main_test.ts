import { assertEquals } from '@std/assert';
import { jumpExported } from './main.ts';

Deno.test(function jump() {
	assertEquals(jumpExported([2,3,1,1,4]), 2);
});
Deno.test(function jump() {
	assertEquals(jumpExported([2,3,0,1,4]), 2);
});
