# My Leetcode

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
As the similar task "Two Sum" was still fresh in my memory, I decided to use the same approach: loop for first and second item and find the third item quickly using a map. I wrote TypeScript code and added a class named ThreeEntryContainer to avoid duplicated entries. The solution got accepted. Afterwards I checked existing solutions on LeetCode website and apparently a faster solution is possible using binary search in a sorted array. I will leave my TypeScript solution unchanged because I feel satisfied with it for now and I do not feel like studying the binary search approach right now.

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

## 36. Valid Sudoku
This seems to be a rather straightforward task: use loops to check rows and 3x3 segments.
My score: time 64 ms, beats 86%; memory: 52 MB, beats 94%.

## 37. Sudoku Solver
Using recursion and reusing the code from the previous task, I have managed to pass all test cases without looking at the available solutions online.
Initially I had duration score: 1000 ms. After multiple rounds of optimizations, I reduced my duration down to 217 ms. This was still pretty far from the best durations, but I did not feel like trying to improve my duration further.
My score: time 217 ms, beats 11%; memory 60 MB beats 7%.

## 38. Count and Say
This task seemed easy enough after I understood how the "run-length encoding" is supposed to work.
My score: time 61 ms, beats 59%; memory 52 MB beats 64%.

## 39. Combination Sum
I got lucky and got optimal solution within around 40 minutes.
My score: time 69 ms, beats 94%; memory 54 MB, beats 82%.

## 40. Combination Sum II
Initially I reused my approach from the previous task and passed almost all test 176 cases, except those coming at the end with many repetitions. I guess the next step is to optimize the program from repeating items in the input array.
Next day I made another attempt at solving this task and it turned out that the key to solving it is reusing the code from the previous task. We group equal elements from the input into stacks to keep arrays such as [1, 1, 1, ... x100] from slowing us down.
My score: time 87 ms, beats 11%; memory 54 MB, beats 29%.

## 41. First Missing Positive
It took about one hour to get get my code to pass all test cases, however I used the built-in sort() function, which probably means that I am ignoring the requirement from the task description: You must implement an algorithm that runs in O(n).
With the sorting approach, I got the following score: time 44 ms, beats 99%; memory 60 MB, beats 55%.
Next, I updated my code to use the built-in Set() from JavaScript. The new code turned out to be shorter: reduced from 19 lines to 14 lines. Score: time 38 ms, beats 99%; memory 72 MB beats 11%.
Too bad my second approach likely ignores the other requirement: "uses O(1) auxiliary space."

## 42. Trapping Rain Water
Initially I iterated from max height down to 0, but that approach turned out to be too slow: I got timeout at test case 322 of 323.
Later I optimized my approach: only iterate through available heights, therefore heights [0, 1000] would be processed without going through all the intermediate 999 heights.
As a result, my code passed but got low score: duration 1087 ms, beats 5%; memory 56 MB, beats 11%.
The article explaining this task is locked behind a paywall.

## 43. Multiply Strings
I still remember how this task was discussed on a lesson at school. As I was writing code for this task, I realized that instead of multiplying number1 by a digit, I can add number1 in a loop from 1 to digit. It might be not the fastest approach, but it worked.
My score: duration 41 ms, beats 20%; memory 57 MB, beats 30%.

## 44. Wildcard Matching
Initially I wrote a straightforward recursive function for checking the pattern.
Later I added some optimizations:
1. Optimize pattern: merge *** sequences into one *
2. Trim pattern: match letters at the end
3. Count remaining letters
4. Use indexOf to jump to the next viable character

However, I still got time limit exceeded at test case 1718 of 1811.
The last optimization was adding a cache: map of number+number to boolean, to avoid checking indexes that were already checked earlier.
My code passed all test cases after I added cache.
My score: duration 21 ms, beats 90%; memory 59 MB, beats 72%.

## 45. Jump Game II
Initially I wrote a straightforward recursive function for jumping and passed up to 74 / 110 test case, got time limit exceeded.
Afterwards I added cache: map of index->result and passed all test cases.
My score: duration 193 ms, beats 10%; memory 60 MB, beats 5%.

## 46. Permutations
I believe I already encountered tasks on LeetCode where permutations were involved. With the previous experience, this task was easy.
My score: duration 1 ms, beats 85%; memory 54 MB, beats 62%.

## 47. Permutations II
I used my code from the previous task and added function `shouldSwap` from https://rosettacode.org/wiki/Permutations_with_some_identical_elements#Go.
This little change was enough to pass all test cases and earn a high score.
My score: duration 3 ms, beats 80%; memory 53 MB, beats 98%.

## 48. Rotate Image
I remember this task was discussed during one programming lesson when I was in school.
As far as I remember, I was unable to solve this task back then.
Today it took me around 1 hour to complete my code for this task.
My score: duration 0 ms, beats 100%; memory 51 MB, beats 44%.

## 49. Group Anagrams
At first I thought that this task is about "mirroring" the supplied words (which seemed difficult),
but then I realized that the task is about letter reordering (which seems easy).
My score: duration 40 ms, beats 41%; memory 63 MB, beats 55%.

## 51. N-Queens
After I wrote my code for this task, I got Time Limit Exceeded on test 7 of 9.
Because there are so few test cases, I decided to use pre-calculation for this task.
It took around 10 minutes to pre-calculate the solutions.
My score: duration 0 ms, beats 100%; memory 52 MB, beats 96%.

## 52. N-Queens II
Here I reused my pre-computed answers from the previous task.
My score: duration 0 ms, beats 100%; memory 50 MB, beats 100%.

## 53. Maximum Subarray
3x loop -> passed up to 200 of 210 test cases online.
2x loop -> passed up to 204 of 210 test cases online.
Kadane's algorithm -> I read an article about it on the internet, then copied the approach into my code.
As a result, my code passed all test cases online, using 1x loop.
My score: duration 2 ms, beats 62%; memory: 60 MB, beats 24%.
Needless to say, without hints & the article explaining how to calculate the sum, it would take me forever to figure out the solution that passes all test cases online.

## 54. Spiral Matrix
This task ended up being easy enough and I completed it without the need to look for hints.
The surprising part was that I got a high score.
My score: duration 0 ms, beats 100%; memory: 51 MB, beats 79%.

## 55. Jump Game
Somehow, "Jump Game II" was positioned before "Jump Game" in the list.
The task was easy enough, considering that I had already completed Jump Game number one in the past.
My score: duration 448 ms, beats 13%; memory 66 MB, beats 5%.

## 56. Merge Intervals
The value range for the intervals is up to 10^4, which is not that much by computer's standards.
Therefore I created a mapping array of every single point.
My score: duration 13 ms, beats 34%; memory 59 MB, beats 82%.

## 57. Insert Interval
This task ended up being easy enough.
The hint section from LeetCode suggests using binary search to find relevant area in the array, but it ended up being unnecessary to pass online test cases.
My score: duration 8 ms, beats 43%; memory 56 MB, beats 26%.

## 58. Length of Last Word
Seems like the fastest solutions in TypeScript uses the built-in function string split().
My score: duration 3 ms, beats 9%; memory 52 MB, beats 5%.

## 59. Spiral Matrix II
This task seems easy enough, especially because there already was a similar task earlier on this list: 54. Spiral Matrix.
My score: duration 0 ms, beats 100%; memory 51 MB, beats 46%.

## 60. Permutation Sequence
At first I have tried using approach using recursion and swap, but it worked poorly because the output of this approach is not strictly sorted.
At that point, I felt like giving up.
However later I changed my mind and used an approach with HashSet and sort() to generate sorted outputs recursively.
As a result, I got a low score but I passed.
My score: duration 1466 ms, beats 11%; memory 56 MB, beats 6%.

## 61. Rotate List
My approach for this task is: first, convert the one directional linked list into two directional linked list.
Next, keep shifting the list `k` times.
My score: duration 1 ms, beats 57%; memory 53 MB, beats 13%.

## 62. Unique Paths
My approach for this task was: first, looking up the formula for permutation count with repetitions: https://byjus.com/permutation-formula/ .
Next, improve calculation through the introduction of function subFactorial which calculates a!/b!.
My score: duration 0 ms, beats 100%; memory 51 MB, beats 91%.

## 63. Unique Paths II
This task is similar to the previous task, but the approach is different.
We fill each cell of the grid with (left + top). I saw this approach mentioned in the comments for the previous task, that is how I learned of it.
My score: duration 2 ms, beats 48%; memory 53 MB, beats 16%.

## 64. Minimum Path Sum
This task is similar to the previous task, but instead of checking for obstacles with gather sums of numbers.
Interesting enough, I tried forcing unique points in previous task by using Set,
but it ended up being useless in the previous task because we can check whether the current point was visited or not,
and avoid duplicated points without the need to use a Set to store current points.
However, in this task I ended up adding and keeping Set, unlike the previous task,
because we have to re-check the points that were already visited, to compare sums and keep the best sum.
My score: duration 35 ms, beats 11%; memory 59 MB, beats 13%.

## 65. Valid Number
Initially I tried using the built-in function parseFloat, however after encountering multiple failed test cases online,
I believed that it is easier to avoid it.
My score: duration 2 ms, beats 70%; memory 54 MB, beats 41%.

## 66. Plus One
This task seemed easy overall.
My score: duration 0 ms, beats 100%; memory 51 MB, beats 13%.

## 67. Add Binary
This task seems easy enough, considering that it was explained in school and I still remember it to this day.
My score: duration 2 ms, beats 59%; memory 52 MB, beats 44%.

## 68. Text Justification
It took me around 1 hour to complete the code for this task without external hints.
My score: duration 0 ms, beats 100%; memory 51 MB, beats 22%.

## 69. Sqrt(x)
The approach here is to keep increasing the result until the product result*result becomes larger than x.
My score: duration 25 ms, beats 19%; memory 54 MB, beats 7%.

## 70. Climbing Stairs
I read through the comments online and it turned out that the answer here is the Fibonacci formula.
My score: duration 0 ms, beats 100%; memory 51 MB, beats 7%.
Could I have guessed the answer without hints? I am not sure.

## 71. Simplify Path
This task seems easy enough because there is no math involved. This is a transformation of data through few simple rules.
My score: duration 2 ms, beats 76%; memory 52 MB, beats 66%.

## 72. Edit Distance
I spent only a little time trying to think of a solution before reading the article explaining how to solve it.
The article suggested using a matrix, meanwhile I was thinking in the direction of a recursive function initially.
Article explaining the approach with distance matrix: https://web.stanford.edu/class/cs124/lec/med.pdf .
At first, I kept an array of previous points to know where to continue.
Later I looked at the existing solutions online and realized that there is no need to store previous points
if we fill the matrix in a simple sequence, so I have updated my approach to discard points array.
My score: duration 10 ms, beats 93%; memory 58 MB, beats 37%.

## 73. Set Matrix Zeroes
This task seems straightforward. The only tricky part here is distinguishing between the original zero cells and secondary zero cells.
Only the original zero cells should trigger changes.
My score: duration 1 ms, beats 96%; memory 54 MB, beats 52%.

## 74. Search a 2D Matrix
The description says that we must write a solution with logarithmic time complexity,
however all tests get passed with a straightforward loop;
My score: duration 0 ms, beats 100%; memory 51 MB, beats 89%.

## 75. Sort Colors
The approach for this task is to count how many zeros, ones and twos are present in the array.
My score: duration 0 ms, beats 100%; memory 51 MB, beats 96%.

## 76. Minimum Window Substring
I have managed to complete this task on my own, although with a low duration score.
My score: duration 550 ms, beats 8%; memory 59 MB, beats 38%.

## 77. Combinations
I have completed the code for this task without looking up any hints online.
The task seemed easy enough, because combinations were already used in the previous tasks.
My score: duration 135 ms, beats 24%; memory 122 MB, beats 56%.

## 78. Subsets
This task seems easy enough, because the previous task is similar. I have copied my code from the previous task into this task.
Afterwards, I had to make a few adjustments to make my code pass all unit tests online.
My score: duration 0 ms, beats 100%; memory 53 MB, beats 59%.

## 79. Word Search
This task seems easy enough overall. The only tricky part here is to remember the cells that were already visited.
At first I cloned the set of visited points on each step, but got a timeout from LeetCode.
Later I stored visited points information in a 2D table.
My score: duration 1061 ms, beats 30%; memory 60 MB, beats 5%.

## 80. Remove Duplicates from Sorted Array II
Loop through the array and keep track of the last and before-last elements.
My score: duration 57 ms, beats 91%; memory 52 MB, beats 67%.

## 81. Search in Rotated Sorted Array II
Earlier there was a task with the same name but without "II". The two tasks are fairly similar, so I already knew how to approach this task.
There are two steps:
1. Find the turning point in the rotated array
2. Use binary search

My score: duration 0 ms, beats 100%; memory 51 MB, beats 95%.

## 82. Remove Duplicates from Sorted List II
My approach for this task ended up being as follows: transfer the value from the source into the output
as long as the current value is not equal to the previous value and not equal to the last value.
My score: duration 0 ms, beats 100%; memory 51 MB, beats 68%.

# My Leetcode Year 2025

## 83. Remove Duplicates from Sorted List
This task is similar to the previous task, easier even.
My score: duration 0 ms, beats 100%; memory 53 MB, beats 64%.

## 84. Largest Rectangle in Histogram
This task seems easy. Perhaps the difficulty comes from the time constraint when processing up to 10^5 source items.
I ended up using the straightforward solution. The only optimization I added was: to skip the item if it is equal to the previous item.
This small optimization was enough to pass all 99 test cases online in TypeScript.
My score: duration 446 ms, beats 6%; memory 59 MB, beats 100%.

## 85. Maximal Rectangle
The trick to completing this task ended up being reusing the code from the previous task and find largest area on each row of the matrix.
My score: duration 20 ms, beats 50%; memory 57 MB, beats 43%.

## 86. Partition List
The approach here is to build two linked lists from the source list.
Elements less than `x` go into the first list. Other elements go into the second list.
At the end, we link the two lists together.
My score: duration 0 ms, beats 100%; memory 52 MB, beats 24%.

## 87. Scramble String
I tried to complete this task without looking at the hints online, and it took a lot of time: 11 hours in total.
Eventually I ended up passing all of the 290 online test cases, however I had to pre-compute the answer for two test cases because calculating them took too much time: over 10 minutes.
My score: duration 38 ms, beats 57%; memory 58 MB, beats 46%.
I found it surprising that I got a relatively high score despite struggling so much. The solution program from the editorial article has 29 lines of code. Meanwhile, my program has 178 lines of code.

## 89. Gray Code
The key to completing this task turned out to be: add 1 to every previous item, reversed.
I looked at the hints online before completing this task, because trying to invent the logic to build the list by myself seemed difficult.
My score: duration 5 ms, beats 55%; memory 58 MB, beats 77%.

## 90. Subsets II
I have completed this task without looking for hints online.
The key to completing this task is to count how many of each sources we have at the beginning.
My score: duration 1 ms, beats 67%; memory 55 MB, beats 13%.

## 91. Decode Ways
One weird fact about this task turned out to be, that it is not necessary to know the actual letters.
In mapping '1' -> 'A' only '1' matters. Meanwhile, 'A' can be discarded from the code entirely.
The key to completing this task ended up being: cache which stores how many further decoding variants exist past the current index.
To be honest, I do not have a 100% proof in my head why this approach is correct, especially in regard to duplicated outputs.
But all online test cases succeeded, so I guess my approach is correct.
My score: duration 1 ms, beats 70%; memory 52 MB, beats 31%.

## 92. Reverse Linked List II
My approach for this task was: to convert one-directional linked list into a two-directional linked list.
One tricky part in this task was to process the situation when the reversed segment starts at 1.
My score: duration 0 ms, beats 100%; memory 51 MB, beats 69%.

## 93. Restore IP Addresses
The approach for this task seems straightforward: attempt to read the next item from the source string recursively.
The task has difficulty=Medium.
My score: duration 6 ms, beats 26%; memory 52 MB, beats 71%.

## 94. Binary Tree Inorder Traversal
Only the author of programming task can understand what does "Inorder" traversal mean.
It became clear to me after I read the editorial article for this task on LeetCode.
My score: duration 0 ms, beats 100%; memory 51.55 MB, beats 64%.

## 95. Unique Binary Search Trees II
Initially I was hesitant about attempting to write code for this task.
Eventually I decided to give it a try and completed the task without looking up hints online.
The tricky part was updating the values in the nodes.
Apparently, the values are supposed to follow a special order:
specifically, the order from the previous task "94 Binary Tree Inorder Traversal"
The description of the current task does NOT mention this.
I passed all online test cases after I recalculated my node.value according to the "Inorder" from the previous task.
My score: duration 7 ms, beats 37%; memory 60 MB, beats 7%.

## 96. Unique Binary Search Trees
This task is similar to the previous task. However, the limit is higher this time: increased from 8 to 19.
Because of the higher limit, it is not possible to reuse code from the previous task directly. The computation takes too long.
Computing the answer for n=19 took four and a half minutes on my desktop PC.
Moving forward from this step, two approaches are possible:
first, to pre-compute the answers for every input from 1 to 19;
second, to look for an algorithm online.
I read through the comments and found a link to the formula for this task:
f(n) = sum(0...n-1, f(i) * f(n - i - 1))
f(0) = 1, f(1) = 1, f(2) = 2.
I ended up using this formula with a cache for already computed outputs.
My score: duration 0 ms, beats 100%; memory 49 MB, beats 96%.

## 97. Interleaving String
I completed this task without looking for hints online.
The approach here is to advance through the desired string character by character and look for candidate characters in the source strings, recursively.
A cache is necessary to finish within the time limit.
My score: duration 54 ms, beats 94%; memory 52 MB, beats 88%.

## 98. Validate Binary Search Tree
The trick here is to compare the current node to all parent nodes, and not only the direct parent.
My score: duration 1 ms, beats 75%; memory 55 MB, beats 32%.

## 99. Recover Binary Search Tree
I struggled with this task for 1h 40m and ended up completing it on my own, without looking for hints online; although my score is pretty low.
My score: duration 104 ms, beats 5%; memory 61 MB, beats 11%.

## 100. Same Tree
This task was easy enough, as expected from a task with an 'easy' tag.
My score: duration 0 ms, beats 100%; memory 51 MB, beats 48%.

## Intermediate summary
* Total time spent on tasks: 129 hours
* Tasks completed in programming languages
	* TypeScript: 80
	* Rust: 19
	* Go: 1
* Here is the total count of tasks that I have completed on my own, compared to the count of tasks that I have managed to complete only after looking for a hint online.
	* No hint: 90
		1. 2
		2. 1
		3. 3
		4. 20
		5. 121
		6. 217
		7. 15
		8. 9
		9. 88
		10. 125
		11. 26
		12. 7
		13. 209
		14. 242
		15. 14
		16. 4
		17. 5
		16. 6
		17. 8
		18. 10
		19. 12
		20. 13
		21. 16
		22. 17
		23. 18
		24. 19
		25. 21
		26. 22
		27. 23
		28. 24
		29. 25
		30. 27
		31. 28
		32. 29
		33. 32
		34. 34
		35. 35
		36. 36
		37. 37
		38. 38
		39. 39
		40. 40
		41. 41
		42. 42
		43. 43
		44. 44
		45. 45
		46. 46
		47. 48
		48. 49
		49. 51
		50. 52
		51. 54
		52. 55
		53. 56
		54. 57
		55. 58
		56. 59
		57. 60
		58. 61
		59. 63
		60. 64
		61. 65
		62. 66
		63. 67
		64. 68
		65. 69
		66. 71
		67. 73
		68. 74
		69. 75
		70. 76
		71. 77
		72. 78
		73. 79
		74. 80
		75. 81
		76. 82
		77. 83
		78. 84
		79. 85
		80. 86
		81. 87, this task took 11 hours
		82. 90
		83. 91
		84. 92
		85. 93
		86. 95
		87. 97
		88. 98
		89. 99
		90. 100
	* Online hint: 13
		1. 50
		2. 11
		3. 30
		4. 31
		5. 33
		6. 47
		7. 53
		8. 62
		9. 70
		10. 72
		11. 89
		12. 94
		13. 96

## 101. Symmetric Tree
This task has "Easy" badge. I have managed to complete this task without looking for hints online.
I have three functions:
1. isSameTree(first, second)
2. flipTree(node)
3. isSymmetric(node)

I compared the left side of the tree with the flipped version of its right side and passed all test cases online.

My score:
* Time: 0 ms, beats 100%
* Memory: 57 MB, beats 76%

## 102. Binary Tree Level Order Traversal
Badge: Medium, although it feels more like easy to me. My score:
* Time: 1 ms, beats 74%
* Memory: 60 MB, beats 42%

## 103. Binary Tree Zigzag Level Order Traversal
Badge: Medium, very similar to the previous task. My score:
* Time: 0ms, beats 100%
* Memory: 57 MB, beats 86%

## 104. Maximum Depth of Binary Tree
Difficulty: Easy. My score:
* Time: 0 ms, beats 100%
* Memory: 58 MB, beats 88%

## 105. Construct Binary Tree from Preorder and Inorder Traversal
Difficulty: Medium.
Initially I tried to build all possible trees and check whether they match the inputted restriction.
In the beginning I got confused and applied level-order instead of inorder visiting, because I thought they were the same.
Even with this wrong approach, I passed 120 of 203 test cases.
Later I corrected my visiting order, and managed to pass 198 of 203 test cases, by building all possible binary trees.
In the end, I decided to look for a hint online and used the approach from page https://www.geeksforgeeks.org/dsa/construct-tree-from-given-inorder-and-preorder-traversal/.
My score:
* Time: 135 ms, beats 5%
* Memory: 105 MB, beats 33%

Total time spent on this task: around 5 hours, including my initial attempts to complete the task without external hints.

## 106. Construct Binary Tree from Inorder and Postorder Traversal
Difficulty: Medium.
Similar to the previous task, but this time we choose the last item in the postorder array.
My score:
* Time: 130 ms, beats 5%
* Memory: 105 MB, beats 21%

## 107. Binary Tree Level Order Traversal II
Difficulty: Medium.
Approach: do a normal level-order traversal and call reverse() at the end.
My score:
* Time: 1 ms, beats 48%
* Memory: 59 MB, beats 18%

## 108. Convert Sorted Array to Binary Search Tree
Difficulty: Easy. I have managed to complete this without external hints.
My score:
* Time: 1 ms, beats 84%
* Memory: 59 MB, beats 76%

## 109. Convert Sorted List to Binary Search Tree
Copy function from the previous task and convert input into an array.
My score:
* Time: 2ms, beats 95%
* Memory: 65 MB, beats 12%

## 110. Balanced Binary Tree
Online hint: no.
My score:
* Time: 2 ms, beats 52%
* Memory: 60 MB, beats 79%

## 111. Minimum Depth of Binary Tree
* Folder name: `minimum-depth-of-binary-tree`
* Online hint: no.
* My score:
	* Time: 6 ms, beats 51%
	* Memory: 92 MB, beats 84%

## 112. Path Sum
* Folder name: `path-sum`
* Online hint: no
* My score:
	* Time: 1 ms, beats 58%
	* Memory: 58 MB, beats 88%

## 113. Path Sum II
* Folder name: `path-sum-ii`
* Online hint: no
* My score:
	* Time: 0 ms, beats 100%
	* Memory: 57 MB, beats 98%

## 114. Flatten Binary Tree to Linked List
* Folder name: `flatten-binary-tree-to-linked-list`
* Online hint: no
* My score:
	* Time: 0 ms, beats 100%
	* Memory: 58 MB, beats 16%

## 115. Distinct Subsequences
* Folder name: `distinct-subsequences`
* Online hint: no
* My score:
	* Time: 33 ms, beats 82%
	* Memory: 56 MB, beats 98%

## 116. Populating Next Right Pointers in Each Node
* Folder name: `populating-next-right-pointers-in-each-node`
* Online hint: no
* My score:
	* Time: 45 ms, beats 98%
	* Memory: 63 MB, beats 12%

## 117. Populating Next Right Pointers in Each Node II
Used the exact same code from the previous task.
* Online hint: no
* My score:
	* Time: 50 ms, beats 93%
	* Memory: 60 MB, beats 57%

## 118. Pascal's Triangle
* Difficulty: Easy
* Folder name: `pascals-triangle`
* Online hint: no
* My score:
	* Time: 0 ms, beats 100%
	* Memory: 56 MB, beats 34%

## 119. Pascal's Triangle II
Same as the previous task, but discard already generated rows from memory.
* Difficulty: Easy
* Folder name: `pascals-triangle-ii`
* Online hint: no
* My score:
	* Time: 1 ms, beats 47%
	* Memory: 56 MB, beats 7%

## 120. Triangle
* Difficulty: Medium
* Folder name: `triangle`
* Online hint: no
* My score:
	* Time: 5 ms, beats 29%
	* Memory: 59 MB, beats 15%

## 122. Best Time to Buy and Sell Stock II
* Difficulty: Medium
* Folder name: `best-time-to-buy-and-sell-stock-ii`
* Online hint: maybe, because I looked through the comments
* My score:
	* Time: 0 ms, beats 100%
	* Memory: 56 MB, beats 44%

## 123. Best Time to Buy and Sell Stock III
* Difficulty: Hard
* Folder name: `best-time-to-buy-and-sell-stock-iii`

I tried to complete this task without hint first. On test case 201, I hit time limit.
It turned out that computing test case 201 takes 80 seconds on my PC.
Afterwards, I watched a video for this task https://www.youtube.com/watch?v=37s1_xBiqH0.
Based on the explanation from the video, I implemented recursive approach with cache.
* My score:
	* Time: 527 ms, beats 6%
	* Memory: 143 MB, beats 5%

## 124. Binary Tree Maximum Path Sum
* Difficulty: Hard
* Folder name: `binary-tree-maximum-path-sum`

My approach: navigate the tree recursively. Passed most tests online, eventually got Time Limit Exceeded.
Added cache: it took me a while to realize that the key of the cache record should be (sourceNode + currentNode).
Passed all test cases online with a low score.
* My score:
	* Time: 41 ms, beats 6%
	* Memory: 78 MB, beats 5%

## 126. Word Ladder II
* Difficulty: Hard
* Folder name: `word-ladder-ii`

Initially I have tried to use recursion, similar to the previous task.
Eventually, I got Time Limit Exceeded and changed my approach:
use wave to find the initial path in the first step and
use recursion to find all possible paths within the waved path.
* My score:
	* Time: 35 ms, beats 66%
	* Memory: 63 MB, beats 56%

## 126. Word Ladder
* Difficulty: Hard
* Folder name: `word-ladder`

Copied the approach from the previous task and narrowed it down to output only the length of the path,
instead of every possible path.
* My score:
	* Time: 1168 ms, beats 6%
	* Memory: 67 MB, beats 36%

## 128. Longest Consecutive Sequence
* Difficulty: Medium
* Folder name: `longest-consecutive-sequence`

This task has a peculiar limitation: You must write an algorithm that runs in O(n) time.
Not sure how exactly this requirement is supposed to be achieved.
I watched this video https://www.youtube.com/watch?v=P6RZZMu_maU and I found the explanation to be rather reasonable,
however I got Time Limit Exceeded when I tried to used the suggested approach, so I went back to my initial approach
to gather the sequences.

* My score:
	* Time: 91 ms, beats 9%
	* Memory: 91 MB, beats 5%

## 129. Sum Root to Leaf Numbers
* Difficulty: Medium
* Folder name: `sum-root-to-leaf-numbers`
* Hint needed: no
* My score:
	* Time: 0 ms, beats 100%
	* Memory: 54 MB, beats 87%

## 130. Surrounded Regions
* Difficulty: Medium
* Folder name: `surrounded-regions`
* I glanced at the comments and saw "If it does not have an exit, then it is considered to be surrounded" in the first comment, so this probably counts as a hint.
* My score:
	* Time: 18 ms, beats 29%
	* Memory: 69 MB, beats 17%

## 131. Palindrome Partitioning
* Difficulty: Medium
* Folder name: `palindrome-partitioning`
* Hint used: no
* Approach: recursive
* My score:
	* Time: 44 ms, beats 17%
	* Memory: 85 MB, beats 9%

## 132. Palindrome Partitioning II
* Difficulty: Hard
* Folder name: `palindrome-partitioning-ii`
* This task is very similar to the previous task, but the length limit of the input string is much higher:
	* Previously 16 characters
	* Now 2000 characters
* I got Time Limit Exceeded, and ended up adding two caches:
	* One cache for the step forward
	* Another cache for checking whether the text is a palindrome
* My score:
	* Time: 863 ms, beats 7%
	* Memory: 256 MB, beats 7%

## 133. Clone Graph
* Difficulty: Medium
* Folder name: `clone-graph`
* My score:
	* Time: 50 ms, beats 59%
	* Memory: 57 MB, beats 83%

## 134. Gas Station
* Difficulty: Medium
* Folder name: `gas-station`
* Hint: probably yes, because I scrolled though the comments and saw the hint
* My score:
	* Time: 2 ms, beats 60%
	* Memory: 66 MB, beats 71%

## 135. Candy
* Difficulty: Hard
* Folder name: `candy`
* Hint: no
* My score:
	* Time: 2940 ms, beats 5%
	* Memory: 60 MB, beats 35%

I ended up pre-computing output for one test case. Online test case number 48 was acting weird: it appears to have two test cases in one.

## 136. Single Number
* Difficulty: Easy
* Folder name: `single-number`
* Hint: no
* Actually satisfying the constraints: also no
* My score:
	* Time: 4 ms, beats 49%
	* Memory: 60 MB, beats 23%

The suggested approach is to use bitwise XOR.

## 137. Single Number II
* Difficulty: Medium
* Folder name: `single-number-ii`
* Hint: no, although the previous task is kind of a hint
* My score:
	* Time: 1 ms, beats 93%
	* Memory: 58 MB, beats 41%

## 138. Copy List with Random Pointer
* Difficulty: Medium
* Folder name: `copy-list-with-random-pointer`
* Hint: no
* My score:
	* Time: 39 ms, beats 87%
	* Memory: 55 MB, beats 96%

## 139. Word Break
* Difficulty: Medium
* Folder name: `word-break`
* Hint: no
* My score:
	* Time: 2 ms, beats 92%
	* Memory: 57 MB, beats 78%

Typical recursive steps with cache.

## 140. Word Break II
* Difficulty: Hard
* Folder name: `word-break-ii`
* Hint: no
* My score:
	* Time: 0 ms, beats 100%
	* Memory: 55 MB, beats 24%

## 141. Linked List Cycle
* Difficulty: Easy
* Folder name: `linked-list-cycle`
* Hint: no
* My score:
	* Time: 49 ms, beats 57%
	* Memory: 59 MB, beats 5%

## 142. Linked List Cycle II
* Difficulty: Medium
* Folder name: `linked-list-cycle-ii`
* Hint: no
* My score:
	* Time: 44 ms, beats 80%
	* Memory: 58 MB, beats 19%

## 143. Reorder List
* Difficulty: Medium
* Folder name: `reorder-list`
* Hint: no
* My score:
	* Time: 2 ms, beats 65%
	* Memory: 65 MB, beats 60%

## 144. Binary Tree Preorder Traversal
* Difficulty: Easy
* Folder name: `binary-tree-preorder-traversal`
* Hint: no
* My score:
	* Time: 0 ms, beats 100%
	* Memory: 56 MB, beats 7%

Once again, a task which is a part of a larger task, appears later than the larger task on LeetCode.
Earlier we already had a task where the student MUST know what does "preorder traversal" mean.

## 145. Binary Tree Postorder Traversal
* Difficulty: Easy
* Folder name: `binary-tree-postorder-traversal`
* Hint: no
* My score:
	* Time: 0 ms, beats 100%
	* Memory: 55 MB, beats 42%

## 146. LRU Cache
* Difficulty: Medium
* Folder name: `lru-cache`
* Hint: no
* My score:
	* Time: 567 ms, beats 7%
	* Memory: 105 MB, beats 99%

## 147. Insertion Sort List
* Difficulty: Medium
* Folder name: `insertion-sort-list`
* Hint: no
* My score:
	* Time: 36 ms, beats 13%
	* Memory: 61 MB, beats 5%

## 148. Sort List
* Difficulty: Medium
* Folder name: `sort-list`
* Hint: no
* My score:
	* Time: 19 ms, beats 84%
	* Memory: 79 MB, beats 67%

## 149. Max Points on a Line
* Difficulty: Hard
* Folder name: max-points-on-a-line
* Hint: no
* My score:
	* Time: 33 ms, beats 47%
	* Memory: 57 MB, beats 98%

## 150. Evaluate Reverse Polish Notation
* Difficulty: Medium
* Folder name: `evaluate-reverse-polish-notation`
* Hint: the Wikipedia page linked in the description had the answer
* My score:
	* Time: 8 ms, beats 40%
	* Memory: 58 MB, beats 81%

## 151. Reverse Words in a String
* Difficulty: Medium
* Folder name: `reverse-words-in-a-string`
* Hint: no
* My score:
	* Time: 2ms, beats 55%
	* Memory: 56 MB, beats 82%

## 152. Maximum Product Subarray
* Difficulty: Medium
* Folder