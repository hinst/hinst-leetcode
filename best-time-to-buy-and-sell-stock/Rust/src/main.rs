struct Solution {}

impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let mut min_price = *prices.get(0).unwrap_or(&0);
        let mut max_profit = 0;
        for price in &prices {
            if *price < min_price {
                min_price = *price;
            }
            let profit = *price - min_price;
            if profit > max_profit {
                max_profit = profit;
            }
        };
        return max_profit;
    }
}

fn main() {
    let profit = Solution::max_profit([7,1,5,3,6,4].to_vec());
    println!("{profit}");
    let profit = Solution::max_profit([7,6,4,3,1].to_vec());
    println!("{profit}");
}
