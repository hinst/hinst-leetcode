# Hinst Leetcode. Year 2023

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

# 50. Pow(x, n)
The main difficulty here was that it seemed unclear at the beginning whether long math is required for the calculation.

## 9. Palindrome Number
This is an easy task. I wrote code directly in Rust for it. At the end of the task description there is a question "Can you solve the task without converting the number into string?" but I do not feel like attempting it because it seems a bit pointless

## 88. Merge Sorted Array
Wrote directly in Rust, accepted from the first try. Seems like an easy task: just copy the smaller of the two numbers while walking through the two arrays.

## 125. Valid Palindrome
An easy task. Walk through the string in two directions: left to right and right to left. Check each character

## 26. Remove Duplicates from Sorted Array
Seems like an easy task. My attempt in Rust got accepted from the first try

## 7. Reverse Integer
Seems like an easy task, although it is marked as "Medium" on LeetCode website. My Rust code got accepted from the first try. Functions checked_mul and checked_add in Rust seem useful for this task.

## 209. Minimum Size Subarray Sum
Seems like an easy task, especially because there was a similar task in the past: Longest Substring Without Repeating Characters. I wrote the solution for this task directly in Rust.

## 242. Valid Anagram
An easy task. Use HashMap. My Rust code got accepted from the first try.

## 14. Longest Common Prefix
Seems like a trivial task. My Rust code got accepted on the first attempt. I convert String into vector of characters. Perhaps it is possible to write a solution using iter() to avoid conversion into vector.

## 4. Median of Two Sorted Arrays
This task is marked as [Hard], but I believe I've heard the solution at the programming lesson in school, although I am not 100% sure. I got it right from the first try because of that.

## 5. Longest Palindromic Substring
Seems like an easy task to solve when using the straightforward approach. Apparently there exists a solution that works in linear time, but the editor says that the explanation of the algorithm is out of scope of the article, so... I decided to skip it and keep my straightforward approach for now. My results: time beats 30%, memory: beats 88%.

## 6. Zigzag Conversion
Initially I wrote the code to fill the 2D field with the exact pattern defined in the task description. Later, I have attempted to calculate row widths and target character indexes from (x,y) however after spending several hours on it, I have decided that it is more trouble than it is worth. Eventually I realized that the X coordinate can be discarded entirely, so my time got reduced from "beats 20%" to "beats 80%". Afterwards I looked at the best solution and saw to my surprise that it uses row[y] += s[i] instead of direct index calculation. I expected it to do the direct index calculation somehow. The "Editorial" for this task is locked, so I do not know what the ideal solution is supposed to be.

## 8. String to Integer (atoi)
I have solved this without looking at the available solutions. Later I compared my code to the available solutions, and I believe my code looks ok. The task is made easy by the fact that most programming languages support 64 bit integer numbers, so there is no need to be too careful about the 32 bit overflow.

## 10. Regular Expression Matching
I have solved this without looking at the available solutions. First I implemented recursive approach with substring(). Later I implemented recursive approach with textIndex. The second approach improved time by around 10% and memory usage by 6MB. My time result is "beats 5%", so apparently there exists a much faster approach.

## 11. Container With Most Water
Initially I solved this task without looking at the available solutions with a full loop through the sorted array. However, the program was too slow. It passed 53 of 63 test cases and timed out. Later I looked into Description->Hint2 and implemented the suggested solution with two pointers moving from the start and end of the array towards the middle of the array. My second solution got accepted. Implementing the second solution was easy because the second hint literally tells you what to do. The tricky part here is the mathematical or logical proof, why exactly does moving from ends into the middle of the array produce the correct result. I do not know how to 100% prove it, but the solution got accepted so I guess this "theorem" must be true. Too bad the proof is far from obvious.

## 12. Integer to Roman
I solved this task without looking at the available solutions because the solution is mostly explained in the task description itself. Because the function is so short, the time result is mostly luck-based. With some retries, I got to 101ms beats 93% and 56MB memory beats 61%.

## 13. Roman to Integer
This looks like the reverse conversion of the previous task.
I wrote an accepted program without looking at the available solutions.
My score: beats 53% time, beats 83% memory.

## 16. 3Sum Closest
I have managed to produce two versions of code for this task:
1. Simple: try all AxBxC combinations
2. Optimized: try all AxB and then find the closest C number using binary search logic in a sorted array.

The run time for my second approach got improved significantly: from 1238 milliseconds to 316 milliseconds. Nevertheless, the second approach beats only 12% of LeetCode submissions, which means that the majority of the participants used an even more optimized approach. The "Editorial" article is locked behind a paywall, so I am not sure what is exactly the recommended approach here.

## 17. Letter Combinations of a Phone Number
This task seems easy enough: produce all possible combinations of the letters. No need to look at the available solutions.
My score:
* 1Time: 47ms, beats 93%. Memory: 51 MB, beats 59%.

## 18. 4Sum
I wrote a program for this task without looking at the available solutions.
I used the following approach: loop AxBxC, D=binarySearch(...).
Afterwards I introduced Js.Map to make existing result lookup faster.
In the end, I scored: time 287 milliseconds beats 20%, memory 59 megabytes beats 18%.

## 19. Remove Nth Node From End of List
I wrote a program for this task without looking at the available solutions.
Approach: first, convert the linked list into bi-directionally linked list.
Second step: walk n steps backwards and cut the n-th node.