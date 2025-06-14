import { isSymmetricEx } from './main.ts';
import { TreeNode } from '../treeNode.ts';
import * as assert from 'jsr:@std/assert';

Deno.test(function test1() {
	assert.assertEquals(true, isSymmetricEx(TreeNode.unwrap([1,2,2,3,4,4,3])));
});

Deno.test(function test2() {
	assert.assertEquals(false, isSymmetricEx(TreeNode.unwrap([1,2,2,null,3,null,3])));
});