struct Solution {}

impl Solution {
    const OPENING_CHARACTERS: [char; 3] = ['{', '(', '['];
    const CLOSING_CHARACTERS: [char; 3] = ['}', ')', ']'];
    const DEBUG_ENABLED: bool = true;

    fn check_valid(characters: &Vec<char>, index: &mut usize) -> bool {
        let character = *characters.get(*index).unwrap();
        let opener_index = Solution::OPENING_CHARACTERS.iter().position(|&opener| opener == character);
        match opener_index {
            Some(opener_index) => {
                *index += 1;
                if !(*index < characters.len()) {
                    if Solution::DEBUG_ENABLED {
                        println!("Unexpected end of text at position {index}");
                    }
                    return false;
                }
                let character = *characters.get(*index).unwrap();
                let expected_closing_character = *Solution::CLOSING_CHARACTERS.get(opener_index).unwrap();
                if character == expected_closing_character {
                    *index += 1;
                    return true;
                } else {
                    let next_valid = Solution::check_valid(characters, index);
                    if !next_valid {
                        println!("Next text is not valid at index {index}");
                        return false;
                    }
                    let character = *characters.get(*index).unwrap();
                    if character == expected_closing_character {
                        *index += 1;
                        return true;
                    } else {
                        if Solution::DEBUG_ENABLED {
                            println!("Expected closing {expected_closing_character} at position {index}");
                        }
                        return false;
                    }
                }
            },
            None => {
                if Solution::DEBUG_ENABLED {
                    println!("Not an opener: {character} at position {index}");
                }
                return false;
            }
        };
    }

    pub fn is_valid(s: String) -> bool {
        if Solution::DEBUG_ENABLED {
            println!("Checking string {s}");
        }
        let characters: Vec<char> = s.chars().collect();
        let mut index: usize = 0;
        return Solution::check_valid(&characters, &mut index);
    }
}

fn test(s: &str, expected_output: bool) {
    let output = Solution::is_valid(s.to_string());
    let matched = expected_output == output;
    println!("[{matched}] {s} expected_output={expected_output} output={output}");
}

fn main() {
    test("()", true);
    test("()[]{}", true);
    test("(]", false);

    test("([][])", true);
    test("([{}{}][{}])", true);
    test("())", false);
    test("(", false);
    test(")", false);
    test("[(]", false);
}
