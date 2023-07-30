struct Solution {}

impl Solution {
    pub fn reverse(x: i32) -> i32 {
        const BASE: i32 = 10;
        let mut x_abs = if x >= 0 { x } else { -x };
        let mut result: i32 = 0;
        let mut first = true;
        while x_abs > 0 {
            let digit = x_abs % BASE;
            x_abs /= BASE;
            if first {
                result = digit;
                first = false;
            } else {
                match result.checked_mul(BASE) {
                    Some(product) => result = product,
                    None => return 0,
                }
                match result.checked_add(digit) {
                    Some(sum) => result = sum,
                    None => return 0,
                }
            }
        }
        return if x >= 0 { result } else { -result };
    }
}

fn main() {
    let output = Solution::reverse(120);
    println!("{output}");
}
