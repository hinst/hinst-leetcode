import { assertEquals } from '@std/assert';
import { maxProfitEx } from './main.ts';

Deno.test(function maxProfit() {
	assertEquals(maxProfitEx([3,3,5,0,0,3,1,4]), 6);
});

Deno.test(function maxProfit() {
	assertEquals(maxProfitEx([1,2,3,4,5]), 4);
});

Deno.test(function maxProfit() {
	assertEquals(maxProfitEx([7,6,4,3,1]), 0);
});
