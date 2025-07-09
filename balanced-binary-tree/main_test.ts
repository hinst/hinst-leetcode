import { assertEquals } from '@std/assert';
import { isBalancedEx } from './main.ts';
import { TreeNode } from '../treeNode.ts';

Deno.test(function isBalanced() {
	assertEquals(isBalancedEx(TreeNode.unwrap([3,9,20,null,null,15,7])), true);
});

Deno.test(function isBalanced() {
	assertEquals(isBalancedEx(TreeNode.unwrap([1,2,2,3,3,null,null,4,4])), false);
});

Deno.test(function isBalanced() { // 88
	assertEquals(isBalancedEx(TreeNode.unwrap([1,null,2,null,3])), false);
});
