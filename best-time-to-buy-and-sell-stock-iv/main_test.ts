import { assertEquals } from '@std/assert';
import { maxProfitEx } from './main.ts';

Deno.test(function maxProfit() {
	const k = 2, prices = [2,4,1];
	assertEquals(maxProfitEx(k, prices), 2);
});

Deno.test(function maxProfit() {
	const k = 2, prices = [3,2,6,5,0,3]
	assertEquals(maxProfitEx(k, prices), 7);
});

Deno.test(function maxProfit() {
	const k = 2, prices = [1,2,4];
	assertEquals(maxProfitEx(k, prices), 3);
});
