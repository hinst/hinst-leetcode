mod solution;
pub use solution::Solution;

use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut numbers: HashMap<i32, usize> = HashMap::new();
        for (index, number) in nums.iter().enumerate() {
            let desired_number = target - number;
            let desired_index = numbers.get(&desired_number);
            match desired_index {
                Some(desired_index) => return vec![*desired_index as i32, index as i32],
                None => numbers.insert(*number, index),
            };
        };
        return vec![0, 0]
    }
}
