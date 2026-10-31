class Edge {
	constructor(readonly begin: boolean, readonly left: number, readonly height: number) {
	}
}

type Point = [number, number];

class Node {
	constructor(readonly item: number, public next?: Node) {
	}
}

class MaxChain {
	root?: Node;

	add(item: number) {
		if (!this.root) {
			this.root = new Node(item);
			return;
		}
		if (this.root.item < item) {
			const newNode = new Node(item, this.root);
			this.root = newNode;
			return;
		}
		for (let node: Node | undefined = this.root; node; node = node.next) {
			if (!node.next || node.next.item <= item) {
				const newNode = new Node(item);
				newNode.next = node.next;
				node.next = newNode;
				break;
			}
		}
	}

	toArray(): number[] {
		const output: number[] = [];
		for (let node: Node | undefined = this.root; node; node = node.next) {
			output.push(node.item);
		}
		return output;
	}
}

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
		if (maxHeight !== previousHeight) {
			const point: Point = [edge.left, maxHeight];
			let previousPoint = points[points.length - 1];
			if (previousPoint?.[0] === point[0]) {
				points.pop();
				let previousPoint = points[points.length - 1];
				if (previousPoint?.[1] !== point[1])
					points.push(point);
			} else
				points.push(point);
		}
		previousHeight = maxHeight;
	}
	return points;
}


///---

export const MaxChainPublic = MaxChain;

// const buildings = [[0,2,3],[2,5,3]];
// console.log(getSkyline(buildings));