import { assertEquals } from "@std/assert";
import { candyEx } from "./main.ts";

Deno.test(function candy() {
	assertEquals(candyEx([1,0,2]), 5);
});
Deno.test(function candy() {
	assertEquals(candyEx([1,2,2]), 4);
});
