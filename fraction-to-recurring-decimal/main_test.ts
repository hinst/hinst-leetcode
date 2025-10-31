import { assert, assertEquals } from '@std/assert';
import { fractionToDecimalEx } from './main.ts';

Deno.test(function fractionToDecimal() {
	assertEquals(fractionToDecimalEx(1, 2), '0.5');
});
Deno.test(function fractionToDecimal() {
	assertEquals(fractionToDecimalEx(2, 1), '2');
});
Deno.test(function fractionToDecimal() {
	assert(['0.(012)', '0.0(120)', '0.01(201)'].includes(fractionToDecimalEx(4, 333)));
});
Deno.test(function fractionToDecimal() {
	assertEquals('-6.25',(fractionToDecimalEx(-50, 8)));
});
