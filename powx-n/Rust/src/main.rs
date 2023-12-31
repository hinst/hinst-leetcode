struct Solution {}

impl Solution {
    pub fn my_pow(x: f64, n: i32) -> f64 {
        let mut result: f64 = 1.0;
        let mut n_abs: i64 = if n >= 0 { n as i64 } else { -(n as i64) };
        let x_squared = if n_abs >= 2 { x * x } else { 1.0 };
        let x_four = if n_abs >= 4 { x_squared * x_squared } else { 1.0 };
        let x_eight = if n_abs >= 8 { x_four * x_four } else { 1.0 };
        while n_abs >= 8 {
            result *= x_eight;
            n_abs -= 8;
        }
        while n_abs >= 4 {
            result *= x_four;
            n_abs -= 4;
        }
        while n_abs >= 2 {
            result *= x_squared;
            n_abs -= 2;
        }
        while n_abs > 0 {
            result *= x;
            n_abs -= 1;
        }
        if n < 0 {
            result = 1.0 / result;
        }
        return result;
    }
}

fn main() {
    let result = Solution::my_pow(2.00000, -2147483648);
    println!("{result}");
}
