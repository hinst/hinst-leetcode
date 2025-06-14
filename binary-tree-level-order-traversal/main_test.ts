import { assertEquals } from '@std/assert';
import { levelOrderEx } from './main.ts';
import { TreeNode } from "../treeNode.ts";

Deno.test(function levelOrder() {
  assertEquals([[3],[9,20],[15,7]], levelOrderEx(TreeNode.unwrap([3,9,20,null,null,15,7])));
});
