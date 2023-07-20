struct Solution {}

use std::collections::HashSet;

impl Solution {
    pub fn contains_duplicate(nums: Vec<i32>) -> bool {
        let mut set: HashSet<i32> = HashSet::new();
        for item in &nums {
            let is_unique = set.insert(*item);
            if !is_unique {
                return true;
            }
        };
        return false;
    }
}

fn test(input: &[i32], expected_output: bool) {
    let output = Solution::contains_duplicate(input.to_vec());
    let matched = output == expected_output;
    println!("{matched}");
}

fn main() {
    test(&[1,2,3,1], true);
    test(&[1,2,3,4], false);
    test(&[1,1,1,3,3,4,3,2,4,2], true);
}
