struct Solution {}

use std::collections::HashSet;
impl Solution {
    fn to_lower_case(character: char) -> char {
        return character.to_lowercase().into_iter().next().unwrap();
    }

    pub fn is_palindrome(s: String) -> bool {
        let characters: Vec<_> = s.chars().collect();
        let mut letters: HashSet<char> = HashSet::new();
        for letter in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".chars() {
            letters.insert(letter);
        }
        let mut left_index = 0;
        let mut right_index = characters.len() - 1;
        while left_index < right_index {
            match characters.get(left_index) {
                Some(left_character) => {
                    match characters.get(right_index) {
                        Some(right_character) => {
                            if !letters.contains(left_character) {
                                left_index += 1;
                                continue;
                            }
                            if !letters.contains(right_character) {
                                right_index -= 1;
                                continue;
                            }
                            let left_character = Self::to_lower_case(*left_character);
                            let right_character = Self::to_lower_case(*right_character);
                            if left_character == right_character {
                                left_index += 1;
                                right_index -= 1;
                            } else {
                                return false;
                            }
                        },
                        None => break,
                    }
                },
                None => break,
            }
        };
        return true;
    }
}

fn main() {
    let output = Solution::is_palindrome("A man, a plan, a canal: Panama".to_string());
    println!("{output}");
    let output = Solution::is_palindrome("0P".to_string());
    println!("{output}");
}
