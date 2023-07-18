struct Solution {}

use std::collections::HashSet;

impl Solution {
    pub fn length_of_longest_substring(s: String) -> i32 {
        let characters: Vec<_> = s.chars().collect();
        let mut max_length: usize = 0;
        let mut start_index: usize = 0;
        let mut end_index: usize = 0;
        let mut map: HashSet<char> = HashSet::new();
        while end_index < characters.len() {
            let current_character = characters.get(end_index).unwrap();
            while map.contains(current_character) {
                map.remove(characters.get(start_index).unwrap());
                start_index += 1;
            }
            map.insert(*current_character);
            end_index += 1;
            let current_length = end_index - start_index;
            if current_length > max_length {
                max_length = current_length;
            };
        };
        return max_length as i32;
    }
}

fn test(s: &str, expected_output: i32) {
    let output = Solution::length_of_longest_substring(s.to_string());
    if expected_output != output {
        println!("[x] {s}  {expected_output} != {output}")
    }
}

fn main() {
    test("abcabcbb", 3);
    test("bbbbb", 1);
    test("pwwkew", 3);
}
