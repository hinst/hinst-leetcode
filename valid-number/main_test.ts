import { assertEquals } from "@std/assert";
import { isNumberEx } from "./main.ts";

const validNumbers = ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1"];
const wrongNumbers = ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"];

Deno.test(function isNumber() {
	for (const validNumber of validNumbers)
		assertEquals(isNumberEx(validNumber), true, validNumber);
	for (const wrongNumber of wrongNumbers)
		assertEquals(isNumberEx(wrongNumber), false, wrongNumber);
});
