import { assertEquals } from '@std/assert';
import { zigzagLevelOrderEx } from './main.ts';
import { TreeNode } from "../treeNode.ts";

Deno.test(function zigzagLevelOrder() {
  assertEquals([[3],[20,9],[15,7]], zigzagLevelOrderEx(TreeNode.unwrap([3,9,20,null,null,15,7])));
});
