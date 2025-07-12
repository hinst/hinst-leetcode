import { assert } from '@std/assert';
import { flattenEx } from './main.ts';
import { TreeNode } from '../treeNode.ts';

Deno.test(function flatten() {
	const tree = TreeNode.unwrap([1,2,5,3,4,null,6]);
	console.log('---');
	console.log(tree?.toString());
	const flatTree = TreeNode.unwrap([1,null,2,null,3,null,4,null,5,null,6]);
	console.log('---');
	console.log(flatTree?.toString());
	flattenEx(tree);
	console.log('---');
	console.log(tree?.toString());
	assert(flatTree?.equals(tree));
});
