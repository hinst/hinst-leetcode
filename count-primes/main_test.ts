import { assertEquals } from '@std/assert';
import { countPrimesExported } from './main.ts';

const countPrimes = countPrimesExported;

Deno.test(function countPrimesTest() {
	assertEquals(countPrimes(10), 4);
});

Deno.test(function countPrimesTest() {
	assertEquals(countPrimes(0), 0);
});

Deno.test(function countPrimesTest() {
	assertEquals(countPrimes(1), 0);
});
