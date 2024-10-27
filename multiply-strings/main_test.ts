import { assertEquals } from '@std/assert';
import { addExported, multiplyExported } from './main.ts';

Deno.test(function add() {
	assertEquals(addExported('2', '3'), '5');
});
Deno.test(function add() {
	assertEquals(addExported('5', '10'), '15');
});
Deno.test(function add() {
	assertEquals(addExported('5', '5'), '10');
});
Deno.test(function add() {
	assertEquals(addExported('1', '999'), '1000');
});
Deno.test(function multiply() {
	assertEquals(multiplyExported('123', '456'), '56088');
});
