mod list_node;
use list_node::ListNode;
struct Solution {}

impl Solution {
    pub fn add_two_numbers(l1: Option<Box<ListNode>>, l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        const BASE: i32 = 10;
        let mut node_result: Option<Box<ListNode>> = None;
        let mut last_node_result = &mut node_result;
        let mut sum_leftover: i32 = 0;
        let mut list_one = l1;
        let mut list_two = l2;
        loop {
            let have_data = list_one.is_some() || list_two.is_some();
            if !have_data {
                break;
            };
            let left_value = match &list_one {
                Some(list_one_inner) => list_one_inner.val,
                None => 0,
            };
            let right_value = match &list_two {
                Some(list_two_inner) => list_two_inner.val,
                None => 0,
            };
            let mut sum = sum_leftover + left_value + right_value;
            sum_leftover = 0;
            if sum >= BASE {
                sum_leftover = sum / BASE;
                sum = sum % BASE;
            };
            let new_node = Some(Box::new(ListNode::new(sum)));
            match last_node_result {
                Some(last_node_result_inner) => {
                    last_node_result_inner.as_mut().next = new_node;
                    last_node_result = &mut last_node_result_inner.as_mut().next;
                },
                None => {
                    node_result = new_node;
                    last_node_result = &mut node_result;
                },
            };
            match list_one {
                Some(list_one_inner) => list_one = list_one_inner.next,
                _ => {}
            };
            match list_two {
                Some(list_two_inner) => list_two = list_two_inner.next,
                _ => {}
            };
        };
        if sum_leftover > 0 {
            match last_node_result {
                Some(last_node_result) => last_node_result.as_mut().next = Some(Box::new(ListNode::new(sum_leftover))),
                _ => {},
            };
        };
        return node_result;
    }
}

fn create_linked_list(list: Vec<i32>) -> Option<Box<ListNode>> {
    let mut node_result: Option<Box<ListNode>> = None;
    let mut last_node_result = &mut node_result;
    for item in list.iter() {
        let new_node = Some(Box::new(ListNode::new(*item)));
        match last_node_result {
            Some(last_node_result_inner) => {
                last_node_result_inner.as_mut().next = new_node;
                last_node_result = &mut last_node_result_inner.as_mut().next;
            },
            None => {
                node_result = new_node;
                last_node_result = &mut node_result;
            },
        };
    };
    return node_result;
}

fn create_vector(node: Option<Box<ListNode>>) -> Vec<i32> {
    let mut vector: Vec<i32> = Vec::new();
    let mut current_node = &node;
    loop {
        match current_node {
            Some(current_node_inner) => {
                vector.push(current_node_inner.as_ref().val);
                current_node = &current_node_inner.as_ref().next;
            },
            None => break,
        }
    };
    return vector;
}

fn test(list_one: Vec<i32>, list_two: Vec<i32>, expected_output: Vec<i32>) {
    let output = create_vector(
        Solution::add_two_numbers(create_linked_list(list_one), create_linked_list(list_two))
    );
    if expected_output != output {
        println!("[x] {expected_output:?} != {output:?}")
    }
}

fn main() {
    let l1 = [2,4,3];
    let l2 = [5,6,4];
    let output = [7,0,8];
    test(l1.to_vec(), l2.to_vec(), output.to_vec());

    let l1 = [0];
    let l2 = [0];
    let output = [0];
    test(l1.to_vec(), l2.to_vec(), output.to_vec());

    let l1 = [9,9,9,9,9,9,9];
    let l2 = [9,9,9,9];
    let output = [8,9,9,9,0,0,0,1];
    test(l1.to_vec(), l2.to_vec(), output.to_vec());
}
