mod solution;

use solution::Solution;

fn main() {
    let nums = [2, 7, 11, 15];
    let target = 9;
    let output = [0, 1];
    match test(nums.to_vec(), target, output.to_vec()) {
        Err(message) => {
            println!("[0] {message}");
        }
        _ => {}
    }

    let nums = [3, 2, 4];
    let target = 6;
    let output = [1, 2];
    match test(nums.to_vec(), target, output.to_vec()) {
        Err(message) => {
            println!("[1] {message}");
        }
        _ => {}
    }

    let nums = [3, 3];
    let target = 6;
    let output = [0, 1];
    match test(nums.to_vec(), target, output.to_vec()) {
        Err(message) => {
            println!("[2] {message}");
        }
        _ => {}
    }
}

fn test(numbers: Vec<i32>, target: i32, expected_output: Vec<i32>) -> Result<(), String> {
    let output = Solution::two_sum(numbers, target);
    let matched = output == expected_output;
    if matched {
        return Ok(())
    } else {
        let message = format!("Expected: {:?}. Actual: {:?}.", expected_output, output);
        return Err(message)
    }
}
