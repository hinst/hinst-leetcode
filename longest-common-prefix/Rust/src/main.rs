struct Solution {}

impl Solution {
    pub fn check_match(target_character: char, character_index: usize, string: &Vec<char>) -> bool {
        match string.get(character_index) {
            Some(character) => target_character == *character,
            None => false
        }
    }

    pub fn longest_common_prefix(strings: Vec<String>) -> String {
        let first_length = strings.get(0).or(Some(&"".to_string())).unwrap().len();
        let mut common_string: Vec<char> = Vec::with_capacity(first_length);
        let strings: Vec<Vec<char>> = strings.iter().map(|string| string.chars().collect()).collect();
        for character_index in 0..first_length {
            let main_character = *strings.get(0).unwrap().get(character_index).unwrap();
            let matched = strings.iter().skip(1).all(|string| Self::check_match(main_character, character_index, string));
            if matched {
                common_string.push(main_character)
            } else {
                break
            }
        }
        return common_string.into_iter().collect();
    }
}

fn test(strings: &[&str]) -> String {
    let strings = strings.to_vec();
    let strings: Vec<String> = strings.iter().map(|s| s.to_string()).collect();
    return Solution::longest_common_prefix(strings);
}

fn main() {
    let strs = ["flower","flow","flight"];
    let output = test(&strs);
    println!("{output}");
}
