# My Leetcode. Year 2023

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

# My Leetcode. Year 2024

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
* Time: 47ms, beats 93%. Memory: 51 MB, beats 59%.

## 18. 4Sum
I wrote a program for this task without looking at the available solutions.
I used the following approach: loop AxBxC, D=binarySearch(...).
Afterwards I introduced Js.Map to make existing result lookup faster.
In the end, I scored: time 287 milliseconds beats 20%, memory 59 megabytes beats 18%.

## 19. Remove Nth Node From End of List
I wrote a program for this task without looking at the available solutions.
Approach: first, convert the linked list into bi-directionally linked list.
Second step: walk n steps backwards and cut the n-th node.
My score: time 58 milliseconds beats 73%, memory 51 megabytes beats 93%.

## 21. Merge Two Sorted Lists
I wrote a program for this task without looking at the available solutions.
TypeScript makes sure you never access field of a null value by accident.
My score: time 65 milliseconds beats 68%, memory 52 megabytes beats 70%.

## 22. Generate Parentheses
I wrote a program for this task without looking at the available solutions.
My initial approach: generate all possible sequences of () and check each sequence whether it is valid or not.
My score: time 74 milliseconds beats 10%, memory 52 megabytes beats 20%.

## 23. Merge k Sorted Lists
My approach: look for the smallest item on the list in a loop. Score: time 403 milliseconds beats 21%, memory 56 MB beats 82%.

## 24. Swap Nodes in Pairs
My approach: build a new list instead of trying to update links in the current list. My score: time 62 milliseconds beats 29%, memory 50 megabytes beats 97%.

## 25. Reverse Nodes in k-Group
My approach: store group in an array.
My score: time 72 ms beats 71%, memory 55 MB beats 15%.

## 27. Remove Element
### Approach 1
My initial approach: create a second array to keep desired elements only. In the first loop we filter the elements and put all the good elements into the second array. In the second loop we copy the desired elements from the good array into the main array.
My score: time 61 ms beats 41%, memory 51 MB beats 70%.
### Approach 2
My second approach: designate the ending of the main array as "garbage" and put all bad elements in there.
My score: time 57 ms beats 62%, memory 50 MB beats 96%.
### Approach 3
Same as approach 2, but assign val directly instead of using swap() function.
My score: 53 ms beats 81%, memory 51 MB beats 17%.

## 28. Find the Index of the First Occurrence in a String
Use function String.indexOf from TypeScript built-in library

## 29. Divide Two Integers
The task description says "without using multiplication, division, and mod operator."
### My Approach 0
Use division operator even though the task says to avoid using it. The solution got accepted after I have added the weird edge case 2147483648.
### My Approach 1
Accumulate sum in a loop until it reaches the target value. TypeScript was too slow to pass this test, so I rewrote the solution in Go.

## 30. Substring with Concatenation of All Words
I spent in total 14 hours trying to solve this task without looking at the available solutions.
Initially I tried building all permutations recursively.
Later I tried using "permutations with some identical elements" from https://rosettacode.org/wiki/Permutations_with_some_identical_elements.
Interestingly enough, I advanced to test case 172 of 182 with relative ease. It's the last 12 test cases that were difficult to get running fast enough.
At the end, I scored time: 2549 milliseconds, beats 7%; Memory: 225 MB, beats 5%.

## 31. Next Permutation
I first tried solving this task without looking at the explanation, but I did look at the hints.
I somehow advanced all the way up to test case 189 of 266 with a solution that had only the first step right, but otherwise it was mostly incorrect.
In the end, I had to read the explanation from the Editorial page. This time the page was available without paid subscription.
I did my best to refactor the code, hoping that it would help me memorize the main algorithm.

1. Find turning index: loop backwards and stop at the first `a < b` position.
2. Find swapping index: loop backwards once more and stop at the first `a < item` position.
3. Swap: turning value `a` from step 1, with `item` from step 2.
4. Reverse the remaining portion of the array that comes after `a`.
5. By the way, if there is no turning index, then nothing should be swapped and the whole array should be reversed.

The fourth step is the most mind-boggling. Why we should reverse the remaining part of the array? Who knows, the proof seems far from obvious to me.
I could not write the code for the solution on my own, but on the bright side... I got nice runtime score: 42 ms beats 100%, memory 52 MB beats 41%.

## 32. Longest Valid Parentheses
My score: time 849 ms beats 5%, memory 52 MB beats 58%.
Apparently there exists a faster solution, but understanding them felt like a lot of effort, so I have decided to skip that step for now and keep my slow solution. Time to move on to the next task.

## 33. Search in Rotated Sorted Array
Weird enough, a solution using a simple loop over the array gets accepted. Perhaps there is no way to test TypeScript code precisely here because it takes longer for the Node.js runtime to start than it takes to loop through the array.
A few days later, I managed to write a solution using binary search and a hint from LeetCode community forum.
There are two steps:
1. Find the turning point in the array
2. Find the number in sorted array using binary search and offset to calculate true item index

In the end, I got score: time 51 ms, beats 87%, memory 52 MB, beats 8.78%. Wait, why is my memory score so low on the ladder? I am not sure.

## 34. Find First and Last Position of Element in Sorted Array
Similar to the previous task, a solution with a straightforward loop is possible despite the fact that the description says you need a fast solution.
I have implemented binary search as designed, got score: time 52 milliseconds, beats 87%; memory 51 MB, beats 92%.

## 35. Search Insert Position
Using binary search once again. Let's see if simple loop solution is possible here. Yes, it gets accepted.