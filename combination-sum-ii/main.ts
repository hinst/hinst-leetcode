function convertSequence(sequence: boolean[], candidates: number[]): number[] {
	const result: number[] = [];
	for (let i = 0; i < sequence.length; ++i)
		if (sequence[i])
			result.push(candidates[i]);
	return result;
}

function getHash(sequence: boolean[], candidates: number[]) {
	let sum = 0;
	let index = 1;
	for (let i = 0; i < sequence.length; ++i) {
		if (sequence[i]) {
			index += index;
			sum += candidates[i] << index;
		}
	}
	return sum;
}

function combinationSumSame(candidates: number[], target: number): number[][] {
	const count = target / candidates[0];
	if (Math.trunc(count) === count && count <= candidates.length)
		return [candidates.slice(0, count)];
	else
		return [];
}

function isSame(candidates: number[]): boolean {
	if (candidates.length === 0)
		return true;
	const first = candidates[0];
	for (let i = 1; i < candidates.length; ++i)
		if (first !== candidates[i])
			return false;
	return true;
}

function combinationSum2(candidates: number[], target: number): number[][] {
	candidates.sort((a, b) => a - b);
	if (isSame(candidates))
		return combinationSumSame(candidates, target);
	const sequence: boolean[] = new Array(candidates.length).fill(false);
	const results = new Map<number, number[]>();
	let sum = 0;
	function find(index: number) {
		// console.log(index, convertSequence(sequence, candidates));
		sequence[index] = true;
		sum += candidates[index];
		if (sum === target) {
			const hash = getHash(sequence, candidates);
			if (!results.has(hash))
				results.set(hash, convertSequence(sequence, candidates));
		} if (sum < target && index < candidates.length - 1)
			find(index + 1);
		sum -= candidates[index];
		sequence[index] = false;
		if (sum < target && index < candidates.length - 1)
			find(index + 1);
	}
	find(0);
	return Array.from(results.values());
}

export const combinationSum2Exported = combinationSum2;

if (import.meta.main) {
	console.time('complete');
	console.log(combinationSum2([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 30));
	console.timeEnd('complete');
}
