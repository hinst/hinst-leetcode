struct Solution {}

use std::collections::{HashMap, HashSet};

struct ThreeEntryContainer {
    entries_map: HashMap<i32, HashMap<i32, HashSet<i32>>>,
    entries: Vec<Vec<i32>>,
}

impl ThreeEntryContainer {
    pub fn new() -> Self {
        return ThreeEntryContainer {
            entries_map: HashMap::new(),
            entries: Vec::new(),
        }
    }

    pub fn add(&mut self, a: i32, b: i32, c: i32) {
        let already_exists = self.check_exists(a, b, c) ||
            self.check_exists(a, c, b) ||
            self.check_exists(b, a, c) ||
            self.check_exists(b, c, a) ||
            self.check_exists(c, a, b) ||
            self.check_exists(c, b, a);
        if !already_exists {
            self.entries.push(vec![a, b, c]);
            let mut first_map = self.entries_map.get_mut(&a);
            if None == first_map {
                let new_map: HashMap<i32, HashSet<i32>> = HashMap::new();
                self.entries_map.insert(a, new_map);
                first_map = self.entries_map.get_mut(&a);
            }
            let first_map = first_map.unwrap();
            let mut second_set = first_map.get_mut(&b);
            if None == second_set {
                let new_set: HashSet<i32> = HashSet::new();
                first_map.insert(b, new_set);
                second_set = first_map.get_mut(&b);
            }
            second_set.as_mut().unwrap().insert(c);
        }
    }

    fn check_exists(&self, a: i32, b: i32, c: i32) -> bool {
        match self.entries_map.get(&a) {
            Some(a_map) => {
                match a_map.get(&b) {
                    Some(b_set) => {
                        return b_set.contains(&c)
                    },
                    None => return false,
                };
            }
            None => return false,
        };
    }
}

impl Solution {
    fn create_map(numbers: &Vec<i32>) -> HashMap<i32, usize> {
        let mut map: HashMap<i32, usize> = HashMap::new();
        for (index, number) in numbers.iter().enumerate() {
            map.insert(*number, index);
        }
        return map;
    }

    pub fn three_sum(numbers: Vec<i32>) -> Vec<Vec<i32>> {
        let map = Solution::create_map(&numbers);
        let mut results = ThreeEntryContainer::new();
        for (first_index, first_item) in numbers.iter().enumerate() {
            for (second_index, second_item) in numbers.iter().enumerate().skip(first_index + 1) {
                let desired_item = 0 - first_item - second_item;
                let third_index = map.get(&desired_item);
                match third_index {
                    Some(third_index_ref) => {
                        let third_index = *third_index_ref;
                        if third_index != second_index && third_index != first_index && first_index != second_index {
                            results.add(*first_item, *second_item, desired_item);
                        }
                    },
                    _ => {},
                }
            }
        };
        return results.entries;
    }
}

fn test(input: &[i32], expected_output: &[&[i32]]) {
    let input = input.to_vec();
    let expected_output: Vec<_> = expected_output.to_vec().iter().map(|item| item.to_vec()).collect();
    let output = Solution::three_sum(input.clone());
    if output != expected_output {
        println!("{input:?}  {output:?}  {expected_output:?}")
    }
}

fn main() {
    test(&[-1,0,1,2,-1,-4], &[&[-1,-1,2],&[-1,0,1]]);
    test(&[0,1,1], &[]);
    test(&[0,0,0], &[&[0,0,0]]);
    test(&[-1,0,1], &[&[-1,0,1]]);
}
