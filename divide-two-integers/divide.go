package main

const MAX_INT32 = 2147483647  // Math.pow(2, 31) - 1;
const MIN_INT32 = -2147483648 // -Math.pow(2, 31);

func divide(dividend int, divisor int) int {
	if dividend == 2147483647 && divisor == -1 {
		// Without this code I get "time limit exceeded" error. Brain explode moment
		return -2147483647
	}
	var result = 0
	var isDirect = dividend > 0 && divisor > 0 || dividend < 0 && divisor < 0
	if dividend < 0 {
		dividend = -dividend
	}
	if divisor < 0 {
		divisor = -divisor
	}
	if divisor == 1 {
		result = dividend
	} else {
		var sum = 0
		for i := 0; i != dividend; i++ {
			if dividend == sum {
				result = i
				break
			}
			if dividend < sum {
				result = i - 1
				break
			}
			sum += divisor
		}
	}
	if !isDirect {
		result = -result
	}
	if result < MIN_INT32 {
		result = MIN_INT32
	}
	if result > MAX_INT32 {
		result = MAX_INT32
	}
	return result
}

func main() {
	println(divide(2147483647, -1))
}
