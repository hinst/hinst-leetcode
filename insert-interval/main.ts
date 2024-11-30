type Interval = [number, number];

function insert(intervals: Interval[], newInterval: Interval): Interval[] {
	if (0 === intervals.length)
		return [newInterval];
	if (newInterval[1] < intervals[0][0])
		return [newInterval, ...intervals];
	if (intervals[intervals.length - 1][1] < newInterval[0])
		return [...intervals, newInterval];
	const results: Interval[] = [];
	let mergeStart = -1;
	let mergeEnd = -1;
	for (const interval of intervals) {
		if (interval[1] < newInterval[0])
			results.push(interval);

		if (newInterval[0] <= interval[0] && interval[0] <= newInterval[1] && mergeStart === -1)
			mergeStart = newInterval[0];
		if (interval[0] <= newInterval[0] && newInterval[0] <= interval[1] && mergeStart === -1)
			mergeStart = interval[0];
		if (newInterval[0] <= interval[1] && interval[1] <= newInterval[1])
			mergeEnd = newInterval[1];
		if (interval[0] <= newInterval[1] && newInterval[1] <= interval[1])
			mergeEnd = interval[1];

		if (newInterval[1] < interval[0]) {
			if (mergeStart !== -1 && mergeEnd !== -1) {
				results.push([mergeStart, mergeEnd]);
				mergeStart = -1;
				mergeEnd = -1;
			}
			results.push(interval);
		}
	}
	if (mergeStart !== -1 && mergeEnd !== -1)
		results.push([mergeStart, mergeEnd]);
	return results;
}

if (import.meta.main) {
	console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]));
}
