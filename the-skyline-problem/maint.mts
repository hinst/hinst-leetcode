class Edge {
	constructor(readonly begin: boolean, readonly left: number, readonly height: number) {
	}
}

type Side = [number, number];

function getSkyline(buildings: number[][]): number[][] {
	const edges: Edge[] = [];
	for (const building of buildings) {
		const left = building[0] || 0;
		const right = building[1] || 0;
		const height = building[2] || 0;
		edges.push(new Edge(true, left, height));
		edges.push(new Edge(true, right, height));
	}
	edges.sort(function(a, b) {
		return a.left - b.left;
	});
	const activeEdges = new Map<number, number>();
	const currentHeight = 0;
	const sides: Side[] = [];
	for (const edge of edges) {
		const activeEdge = activeEdges.get(edge.height) ?? 0;
		if (edge.begin)
			activeEdges.set(edge.height, activeEdge + 1);
		else {
			activeEdges.set(edge.height, activeEdge - 1);
			if (activeEdge === 1)
				activeEdges.delete(edge.height);
		}
		const heights = Array.from(activeEdges.keys()).sort(function(a, b) {
			return b - a;
		});
		console.log(heights[0]);
	}
	return sides;
}