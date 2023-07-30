struct Solution {}

impl Solution {
    pub fn remove_duplicates(numbers: &mut Vec<i32>) -> i32 {
        let mut index = 0;
        for number in numbers.clone().iter() {
            let previous_number = if index > 0 { numbers.get(index - 1) } else { None };
            match previous_number {
                Some(previous_number) => {
                    if number != previous_number {
                        numbers[index] = *number;
                        index += 1;
                    }
                },
                None => {
                    index += 1;
                }
            }
        }
        return index as i32;
    }
}

fn main() {
    let mut numbers = [1,1,2].to_vec();
    let output = Solution::remove_duplicates(&mut numbers);
    let numbers: Vec<_> = numbers.iter().take(output as usize).collect();
    println!("{output} {numbers:?}");

    let mut numbers = [0,0,1,1,1,2,2,3,3,4].to_vec();
    let output = Solution::remove_duplicates(&mut numbers);
    let numbers: Vec<_> = numbers.iter().take(output as usize).collect();
    println!("{output} {numbers:?}");
}
