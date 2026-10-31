class Edge {
	constructor(readonly begin: boolean, readonly left: number, readonly height: number) {
	}
}

type Point = [number, number];

function getSkyline(buildings: number[][]): number[][] {
	const edges: Edge[] = [];
	for (const building of buildings) {
		const left = building[0] || 0;
		const right = building[1] || 0;
		const height = building[2] || 0;
		edges.push(new Edge(true, left, height));
		edges.push(new Edge(false, right, height));
	}
	edges.sort(function(a, b) {
		return a.left - b.left;
	});
	const activeEdges = new Map<number, number>();
	let previousHeight = 0;
	const points: Point[] = [];
	for (const edge of edges) {
		const activeEdge = activeEdges.get(edge.height) ?? 0;
		if (edge.begin)
			activeEdges.set(edge.height, activeEdge + 1);
		else {
			activeEdges.set(edge.height, activeEdge - 1);
			if (activeEdge === 1)
				activeEdges.delete(edge.height);
		}
		let maxHeight = 0;
		for (const height of activeEdges.keys()) {
			if (maxHeight < height)
				maxHeight = height;
		}
		if (maxHeight !== previousHeight)
			points.push([edge.left, maxHeight]);
		previousHeight = maxHeight;
	}
	return points;
}


///---

const buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]];
console.log(getSkyline(buildings));