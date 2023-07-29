struct Solution {}

impl Solution {
    pub fn merge(
        first_numbers: &mut Vec<i32>, first_number_count: i32,
        second_numbers: &mut Vec<i32>, _second_number_count: i32
    ) {
        let output_numbers = first_numbers;
        let mut first_numbers: Vec<i32> = Vec::with_capacity(first_number_count as usize);
        for number in output_numbers.iter().take(first_number_count as usize) {
            first_numbers.push(*number)
        }
        let mut first_index: usize = 0;
        let mut second_index: usize = 0;
        let mut output_index: usize = 0;
        while output_index < output_numbers.len() {
            let first_number = first_numbers.get(first_index);
            let second_number = second_numbers.get(second_index);
            match first_number {
                Some(first_number) => {
                    let first_number = *first_number;
                    match second_number {
                        Some(second_number) => {
                            let second_number = *second_number;
                            if first_number < second_number {
                                output_numbers[output_index] = first_number;
                                first_index += 1;
                            } else {
                                output_numbers[output_index] = second_number;
                                second_index += 1;
                            }
                        },
                        None => {
                            output_numbers[output_index] = first_number;
                            first_index += 1;
                        }
                    }
                },
                None => {
                    match second_number {
                        Some(second_number) => {
                            let second_number = *second_number;
                            output_numbers[output_index] = second_number;
                            second_index += 1;
                        },
                        None => {
                            break;
                        }
                    }
                }
            }
            output_index += 1;
        }
    }
}

fn test(nums1: &[i32], m: i32, nums2: &[i32], n: i32, expected_output: &[i32]) {
    let mut nums1 = nums1.to_vec();
    let mut nums2 = nums2.to_vec();
    Solution::merge(&mut nums1, m, &mut nums2, n);
    let expected_output = expected_output.to_vec();
    let matched = expected_output == nums1;
    if !matched {
        println!("expected {expected_output:?} actual {nums1:?}")
    }
}

fn main() {
    let nums1 = [1,2,3,0,0,0];
    let m = 3;
    let nums2 = [2,5,6];
    let n = 3;
    let output = [1,2,2,3,5,6];
    test(&nums1, m, &nums2, n, &output);

    let nums1 = [1];
    let m = 1;
    let nums2 = [];
    let n = 0;
    let output = [1];
    test(&nums1, m, &nums2, n, &output);

    let nums1 = [0];
    let m = 0;
    let nums2 = [1];
    let n = 1;
    let output = [1];
    test(&nums1, m, &nums2, n, &output);
}
