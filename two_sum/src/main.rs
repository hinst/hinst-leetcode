mod solution;

use solution::Solution;

fn main() {
    let nums = [2, 7, 11, 15];
    let target = 9;
    let output = [0, 1];
    match test(nums.to_vec(), target, output.to_vec()) {
        Err(message) => {
            println!("[x] {message}");
            return;
        }
        _ => {}
    }
}

fn test(numbers: Vec<i32>, target: i32, expectedOutput: Vec<i32>) -> Result<(), String> {
    let output = Solution::two_sum(numbers, target);
    let matched = output == expectedOutput;
    if matched {
        return Ok(())
    } else {
        return Err(format!("Expected: {:?}. Actual: {:?}.", expectedOutput, output))
    }
}
