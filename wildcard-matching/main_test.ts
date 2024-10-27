import { assertEquals } from '@std/assert';
import { isMatchExported } from './main.ts';

Deno.test(function isMatch() {
	assertEquals(isMatchExported('aa', 'a'), false);
});
Deno.test(function isMatch() {
	assertEquals(isMatchExported('aa', '*'), true);
});
