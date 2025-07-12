import { assertEquals } from '@std/assert';
import { TreeNode } from '../treeNode.ts';
import { minDepthEx } from './main.ts';

Deno.test(function minDepth() {
	const tree = TreeNode.unwrap([3,9,20,null,null,15,7]);
	assertEquals(minDepthEx(tree), 2);
});

Deno.test(function minDepth() {
	const tree = TreeNode.unwrap([2,null,3,null,4,null,5,null,6]);
	assertEquals(minDepthEx(tree), 5);
});
