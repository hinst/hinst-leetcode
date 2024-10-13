function convertSequence(sequence: number[], candidates: number[]): number[] {
	const result: number[] = [];
	for (let i = 0; i < sequence.length; ++i)
		for (let count = 0; count < sequence[i]; ++count)
			result.push(candidates[i]);
	return result;
}

function combinationSum(candidates: number[], target: number): number[][] {
	candidates.sort((a, b) => a - b);
	const sequence = new Array(candidates.length).fill(0);
	let sum = 0;
	const results: number[][] = [];
	function find(index: number) {
		for (let i = 0; i < Number.MAX_SAFE_INTEGER; ++i) {
			sequence[index] = i;
			const delta = candidates[index] * i;
			sum += delta;
			let isDeadEnd = false;
			if (sum < target) {
				if (index < candidates.length - 1)
					find(index + 1);
			} else if (sum === target) {
				results.push(convertSequence(sequence, candidates));
			} else
				isDeadEnd = true;
			sum -= delta;
			if (isDeadEnd)
				break;
		}
		sequence[index] = 0;
	}
	find(0);
	return results;
}

console.log(combinationSum([2,3,6,7], 7));