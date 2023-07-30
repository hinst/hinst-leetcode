
struct Solution {}

use std::collections::HashMap;
impl Solution {
    fn create_map(s: String) -> HashMap<char, i32> {
        let mut map: HashMap<char, i32> = HashMap::new();
        for character in s.chars().into_iter() {
            let count = map.get(&character).or(Some(&0));
            map.insert(character, count.unwrap() + 1);
        }
        return map;
    }

    pub fn is_anagram(s: String, t: String) -> bool {
        let map_one = Self::create_map(s);
        let map_two = Self::create_map(t);
        return map_one == map_two;
    }
}

fn main() {
    let s = "anagram";
    let t = "nagaram";
    let output = Solution::is_anagram(s.to_string(), t.to_string());
    println!("{output}");
}
