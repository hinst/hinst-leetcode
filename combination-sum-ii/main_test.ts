import { assertEquals } from '@std/assert';
import { combinationSum2Exported } from './main.ts';

Deno.test(function addTest() {
	assertEquals(combinationSum2Exported([10,1,2,7,6,1,5], 8), [ [ 1, 1, 6 ], [ 1, 2, 5 ], [ 1, 7 ], [ 2, 6 ] ]);
});
