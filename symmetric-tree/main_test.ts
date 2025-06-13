import { isSymmetricEx } from './main.ts';
import { TreeNode } from '../tree.ts';

Deno.test(function test1() {
	console.log(TreeNode.unwrap([1,2,2,3,4,4,3])?.toString());
});