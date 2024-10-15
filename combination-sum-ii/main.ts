function convertSequence(sequence: number[], candidates: number[]): number[] {
	const result: number[] = [];
	for (let i = 0; i < sequence.length; ++i)
		for (let count = 0; count < sequence[i]; ++count)
			result.push(candidates[i]);
	return result;
}

function combinationSum(candidates: number[], limits: number[], target: number): number[][] {
	candidates.sort((a, b) => a - b);
	const sequence = new Array(candidates.length).fill(0);
	let sum = 0;
	const results: number[][] = [];
	function find(index: number) {
		for (let i = 0; i <= limits[index]; ++i) {
			sequence[index] = i;
			const delta = candidates[index] * i;
			sum += delta;
			let isDeadEnd = false;
			if (sum < target) {
				if (index < candidates.length - 1)
					find(index + 1);
			} else if (sum === target) {
				results.push(sequence.slice());
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

function getCounted(candidates: number[]): [number[], number[]] {
	const map = new Map<number, number>();
	for (const item of candidates)
		map.set(item, (map.get(item) || 0) + 1)
	return [Array.from(map.keys()), Array.from(map.values())];
}

function combinationSum2(candidates: number[], target: number): number[][] {
	candidates.sort((a, b) => a - b);
	const [countedCandidates, limits] = getCounted(candidates);
	const countedResults = combinationSum(countedCandidates, limits, target);
	const results: number[][] = [];
	for (const countedResult of countedResults)
		results.push(convertSequence(countedResult, countedCandidates));
	return results;
}

export const combinationSum2Exported = combinationSum2;

if (import.meta.main) {
	console.time('complete');
	console.log(combinationSum2([10,1,2,7,6,1,5], 8));
	console.timeEnd('complete');
}
