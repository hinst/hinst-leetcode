mod solution;
pub use solution::Solution;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        for first_index in 0..nums.len() {
            let first_number = *nums.get(first_index).unwrap();
            for second_index in first_index + 1..nums.len() {
                let second_number = *nums.get(second_index).unwrap();
                let sum = first_number + second_number;
                if sum == target {
                    return vec![first_index as i32, second_index as i32]
                }
            }
        }
        return vec![0, 0]
    }
}
