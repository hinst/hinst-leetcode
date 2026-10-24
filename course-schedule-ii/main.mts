class Node {
	constructor(readonly id: number) {
	}
	public sourceCount: number = 0;
	readonly destinations: Set<Node> = new Set();
}

function buildNodes(numCourses: number, prerequisites: number[][], roots: Set<number>): Map<number, Node> {
	for (let i = 0; i < numCourses; ++i)
		roots.add(i);
	const nodes: Map<number, Node> = new Map();
	for (const item of prerequisites) {
		const destination = item[0] !!;
		const source = item[1] !!;

		let destinationNode = nodes.get(destination);
		if (!destinationNode) {
			destinationNode = new Node(destination);
			nodes.set(destination, destinationNode);
		}
		destinationNode.sourceCount += 1;

		let sourceNode = nodes.get(source);
		nodes.getOrInsertComputed
		if (!sourceNode) {
			sourceNode = new Node(source);
			nodes.set(source, sourceNode);
		}
		sourceNode.destinations.add(destinationNode);
		roots.delete(destination);
	}
	return nodes;
}

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	const roots: Set<number> = new Set();
	const nodes = buildNodes(numCourses, prerequisites, roots);
	const sortedItems: number[] = [];
	while (roots.size) {
		const [rootId] = roots;
		roots.delete(rootId !!);
		sortedItems.push(rootId !!);
		const sourceNode = nodes.get(rootId !!);
		if (!sourceNode)
			continue;
		for (const destinationNode of sourceNode.destinations) {
			destinationNode.sourceCount -= 1;
			if (destinationNode.sourceCount <= 0)
				roots.add(destinationNode.id);
		}
		sourceNode.destinations.clear();
	}
	return sortedItems.length === numCourses ? sortedItems : [];
}

const numCourses = 6, prerequisites = [[2,3],[1,2],[0,1],[0,4],[4,5],[5,1]];
console.log(findOrder(numCourses, prerequisites));