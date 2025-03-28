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

const LIMIT = 10000;

function merge(intervals: number[][]): number[][] {
	sortIntervals(intervals);
	const isMergedIntervals: boolean[] | undefined = new Array(intervals.length);
	let map: number[] | undefined = new Array(LIMIT);
	for (let intervalIndex = 0; intervalIndex < intervals.length; ++intervalIndex) {
		const interval = intervals[intervalIndex];
		const left = interval[0];
		const right = interval[1];
		let existing: number | undefined;
		for (let i = left; i <= right; ++i) {
			existing = map[i];
			if (existing !== undefined) {
				isMergedIntervals[intervalIndex] = true;
				collapse(intervals[existing], interval);
				break;
			}
		}
		const finalIndex = undefined !== existing ? existing : intervalIndex;
		for (let i = left; i <= right; ++i)
			map[i] = finalIndex;
	}
	map = undefined;
	let mergedIntervals = intervals.filter((_, index) => !isMergedIntervals[index]);
	if (mergedIntervals.length != intervals.length)
		mergedIntervals = merge(mergedIntervals);
	return mergedIntervals;
}

export const mergeEx = merge;
export const sortIntervalsEx = sortIntervals;

if (import.meta.main) {
	console.log(merge(
		[[5,5],[1,3],[3,5],[4,6],[1,1],[3,3],[5,6],[3,3],[2,4],[0,0]]
	));
}
