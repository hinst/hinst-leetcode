struct Solution {}

impl Solution {
    pub fn min_sub_array_len(target: i32, numbers: Vec<i32>) -> i32 {
        let mut begin = 0;
        let mut end = 0;
        let mut sum = 0;
        let mut min_size = 0;
        while end < numbers.len() {
            sum += numbers.get(end).unwrap();
            end += 1;
            if sum >= target {
                let size = end - begin;
                if min_size == 0 || size <= min_size {
                    min_size = size;
                }
            }
            while sum >= target {
                sum -= numbers.get(begin).unwrap();
                begin += 1;
                let size = end - begin;
                if sum >= target && (min_size == 0 || size <= min_size) {
                    min_size = size;
                }
            }
        }
        return min_size as i32;
    }
}

fn test(target: i32, numbers: &[i32]) {
    let output = Solution::min_sub_array_len(target, numbers.to_vec());
    println!("{output}");
}

fn main() {
    let target = 7; let nums = [2,3,1,2,4,3];
    test(target, &nums);

    let target = 4; let nums = [1,4,4];
    test(target, &nums);

    let target = 11; let nums = [1,1,1,1,1,1,1,1];
    test(target, &nums);
}
