import * as assert from '@std/assert';
import { buildTreeEx } from './main.ts';
import { TreeNode } from "../treeNode.ts";

Deno.test(function buildTree() {
	const expected = TreeNode.unwrap([3,9,20,null,null,15,7]);
	const actual = buildTreeEx([3,9,20,15,7], [9,3,15,20,7]);
	assert.assert(expected?.equals(actual));
});

Deno.test(function buildTreeSingular() {
	const expected = TreeNode.unwrap([-1]);
	const actual = buildTreeEx([-1], [-1]);
	assert.assert(expected?.equals(actual));
});
