const LOW = (-1) * Math.pow(10, 4);

function findKthLargestSort(inputs: number[], k: number): number {
	inputs.sort(function(a, b) {
		return b - a;
	});
	return inputs[k - 1] ?? 0;
}

function findMax(inputs: number[]): number {
	let max = LOW;
	for (const input of inputs)
		if (max < input)
			max = input;
	return max;
}

function findSecond(inputs: number[]): number {
	let max = LOW, second = LOW;
	for (const input of inputs) {
		if (max < input) {
			second = max;
			max = input;
		} else if (second < input)
			second = input;
	}
	return second;
}

function findThird(inputs: number[]): number {
	let first = LOW, second = LOW, third = LOW;
	for (const input of inputs) {
		if (first < input) {
			third = second;
			second = first;
			first = input;
		} else if (second < input) {
			third = second;
			second = input;
		} else if (third < input)
			third = input;
	}
	return third;
}

function findFourth(inputs: number[]): number {
	let first = LOW, second = LOW, third = LOW, fourth = LOW;
	for (const input of inputs) {
		if (first < input) {
			fourth = third;
			third = second;
			second = first;
			first = input;
		} else if (second < input) {
			fourth = third;
			third = second;
			second = input;
		} else if (third < input) {
			fourth = third;
			third = input;
		} else if (fourth < input)
			fourth = input;
	}
	return fourth;
}

function findKthLargest(inputs: number[], k: number): number {
	switch (k) {
		case 1:
			return findMax(inputs);
		case 2:
			return findSecond(inputs);
		case 3:
			return findThird(inputs);
		case 4:
			return findFourth(inputs);
		default:
			return findKthLargestSort(inputs, k);
	}
}


///---

export const findKthLargestPublic = findKthLargest;
