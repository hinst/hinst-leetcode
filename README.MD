# Hinst Leetcode

## 2. Add two numbers
I wrote the solution on my own. First I wrote the solution in TypeScript, then I converted it to Rust. The Rust version ended up being 60 lines, meanwhile TypeScript version is only 30 lines. Later I saw shorter solutions in Rust on Leetcode.

## 1. Two Sum
I wrote the slow solution on my own. I had to look through the existing solutions to find the fast solution. There is only Rust version.

## 3. Longest Substring Without Repeating Characters
I wrote the solution on my own. First I wrote it in TypeScript, then I converted it to Rust. Code length is similar for both solutions.

## 20. Valid Parentheses
I wrote the solutions on my own. There is only Rust version.

## 121. Best Time to Buy and Sell Stock
I wrote TypeScript solution myself without checking hints. However, I ended up with a complicated solution. It passed the acceptance test, but I realized that there exists a much simpler solution after I looked through the existing solutions on LeetCode. I implemented the short solution in Rust.

## 217. Contains Duplicate
A simple task. Just use HashMap, I guess. I skipped TypeScript and wrote a simple solution in Rust.

## 15. 3Sum
As the memory of a similar task "Two Sum" was still fresh in my memory, I decided to use the same approach: loop for first and second item and find the third item quickly using a map. I wrote TypeScript code and added a class named ThreeEntryContainer to avoid duplicated entries. The solution got accepted. Afterwards I checked existing solutions on LeetCode website and apparently a faster solution is possible using binary search in a sorted array. I will leave my TypeScript solution unchanged because I feel satisfied with it for now and I do not feel like studying the binary search approach right now.