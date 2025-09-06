export type Point = [number, number];

function maxPoints(points: Point[]): number {
	if (points.length === 0)
		return 0;
	if (points.length === 1)
		return 1;
	let bestCount = 0;
	for (let a = 0; a < points.length; ++a) {
		for (let b = a + 1; b < points.length; ++b) {
			let count = 2;
			for (let c = b + 1; c < points.length; ++c) {
				if (check(points[a], points[b], points[c]))
					++count;
			}
			if (bestCount < count)
				bestCount = count;
		}
	}
	return bestCount;
}

/*
10 20
15 30
20 40
*/

function check(a: Point, b: Point, c: Point) {
	if (a[0] === b[0] && b[0] === c[0])
		return true;
	if (a[1] === b[1] && b[1] === c[1])
		return true;
	return (b[0] - a[0]) / (b[1] - a[1]) === (c[0] - b[0]) / (c[1] - b[1]);
}


export const maxPointsEx = maxPoints;

if (import.meta.main) {
	const points: Point[] = [[2,3],[3,3],[-5,3]];
	console.log(check(points[0], points[1], points[2]));
}
