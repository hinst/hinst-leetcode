struct Solution {}

impl Solution {
    pub fn is_palindrome(x: i32) -> bool {
        let characters: Vec<_> = x.to_string().chars().collect();
        let mut result = true;
        let half_length = characters.len() / 2;
        for i in 0..characters.len() {
            let first = characters.get(i).unwrap();
            let second = characters.get(characters.len() - 1 - i).unwrap();
            if first != second {
                result = false;
                break;
            }
            if i >= half_length {
                break;
            }
        }
        return result;
    }
}

fn main() {
    let number = -121;
    let output = Solution::is_palindrome(number);
    println!("{number} {output}");
}
