use std::collections::{HashMap, HashSet};

struct Solution {}

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

    pub fn add(&self, a: i32, b: i32, c: i32) {
        let already_exists = self.check_exists(a, b, c) ||
            self.check_exists(a, c, b) ||
            self.check_exists(b, a, c) ||
            self.check_exists(b, c, a) ||
            self.check_exists(c, a, b) ||
            self.check_exists(c, b, a);
        if !already_exists {
            self.entries.push(vec![a, b, c]);
            let mut first_map = self.entries_map.get(&a);
            if None == first_map {
                let new_map: HashMap<i32, HashSet<i32>> = HashMap::new();
                first_map = Some(&self.entries_map.insert(a, new_map).unwrap());
            }
            let mut second_set = first_map.unwrap().get(&b);
            if None == second_set {
                let new_set: HashSet<i32> = HashSet::new();
                second_set = Some(&first_map.unwrap().insert(b, new_set).unwrap());
            }
            second_set.unwrap().insert(c);
        }
    }

    fn check_exists(&self, a: i32, b: i32, c: i32) -> bool {
        match self.entries_map.get(&a) {
            Some(aMap) => {
                match aMap.get(&b) {
                    Some(bSet) => {
                        return bSet.contains(&c)
                    },
                    None => return false,
                };
            }
            None => return false,
        };
    }
}

impl Solution {
    pub fn three_sum(numbers: Vec<i32>) -> Vec<Vec<i32>> {
        let mut results = ThreeEntryContainer::new();
    }
}

fn main() {
    println!("Hello, world!");
}
