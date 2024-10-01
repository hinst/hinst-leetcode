import { assertEquals } from '@std/assert';
import { longestValidParentheses } from './main.ts';

Deno.test(function longestValidParenthesesTest() {
  assertEquals(longestValidParentheses('(()'), 2);
});

Deno.test(function longestValidParenthesesTest() {
  assertEquals(longestValidParentheses(')()())'), 4);
});

Deno.test(function longestValidParenthesesTest() {
  assertEquals(longestValidParentheses(''), 0);
});
