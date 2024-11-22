function collapse(target: number[], source: number[]) {
	if (source[0] < target[0])
		target[0] = source[0];
	if (target[1] < source[1])
		target[1] = source[1];
}

function merge(intervals: number[][]): number[][] {
	const mergedIntervals: boolean[] = new Array(intervals.length).fill(false);
	const map = new Map<number, number>();
	for (let intervalIndex = 0; intervalIndex < intervals.length; ++intervalIndex) {
		const interval = intervals[intervalIndex];
		const left = interval[0];
		const right = interval[1];
		let existing: number | undefined;
		for (let i = left; i <= right; ++i) {
			existing = map.get(i);
			if (existing !== undefined) {
				mergedIntervals[intervalIndex] = true;
				collapse(intervals[existing], interval);
			}
		}
		const finalIndex = undefined !== existing ? existing : intervalIndex;
		for (let i = left; i <= right; ++i)
			map.set(i, finalIndex);
	}
	return intervals.filter((_, index) => !mergedIntervals[index]);
}

export const mergeEx = merge;

if (import.meta.main) {
	console.log(merge([[4,5],[1,4],[0,1]]));
}
