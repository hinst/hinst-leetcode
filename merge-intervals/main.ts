function collapse(target: number[], source: number[]) {
	if (source[0] < target[0])
		target[0] = source[0];
	if (target[1] < source[1])
		target[1] = source[1];
}

function sortIntervals(intervals: number[][]) {
	intervals.sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]));
	return intervals;
}

function merge(intervals: number[][]): number[][] {
	sortIntervals(intervals);
	const isMergedIntervals: boolean[] = new Array(intervals.length).fill(false);
	const map = new Map<number, number>();
	for (let intervalIndex = 0; intervalIndex < intervals.length; ++intervalIndex) {
		const interval = intervals[intervalIndex];
		const left = interval[0];
		const right = interval[1];
		let existing: number | undefined;
		for (let i = left; i <= right; ++i) {
			existing = map.get(i);
			if (existing !== undefined) {
				isMergedIntervals[intervalIndex] = true;
				collapse(intervals[existing], interval);
			}
		}
		const finalIndex = undefined !== existing ? existing : intervalIndex;
		for (let i = left; i <= right; ++i)
			map.set(i, finalIndex);
	}
	let mergedIntervals = intervals.filter((_, index) => !isMergedIntervals[index]);
	if (mergedIntervals.length != intervals.length)
		mergedIntervals = merge(mergedIntervals);
	return mergedIntervals;
}

export const mergeEx = merge;
export const sortIntervalsEx = sortIntervals;

if (import.meta.main) {
	console.log(merge([[2,3],[4,5],[6,7],[8,9],[1,10]]));
}
