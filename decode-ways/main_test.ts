import { assertEquals } from '@std/assert';
import { numDecodingsEx } from './main.ts';

Deno.test(function numDecodings() {
	assertEquals(numDecodingsEx('12'), 2);
});
Deno.test(function numDecodings() {
	assertEquals(numDecodingsEx('226'), 3);
});
Deno.test(function numDecodings() {
	assertEquals(numDecodingsEx('06'), 0);
});
