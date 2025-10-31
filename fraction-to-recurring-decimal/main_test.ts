import { assertEquals } from '@std/assert';
import { fractionToDecimalEx } from './main.ts';

Deno.test(function fractionToDecimal() {
	assertEquals(fractionToDecimalEx(1, 2), '0.5');
});
Deno.test(function fractionToDecimal() {
	assertEquals(fractionToDecimalEx(2, 1), '2');
});
Deno.test(function fractionToDecimal() {
	assertEquals(fractionToDecimalEx(4, 333), '0.(012)');
});
