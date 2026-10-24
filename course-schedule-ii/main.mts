class Node {
	constructor(readonly id: number) {
	}
	sourceCount: number = 0;
	destinations: Set<Node> = new Set();
}

function buildNodes(numCourses: number, prerequisites: number[][], roots: Map<number, Node>): Map<number, Node> {
	const rootIds = new Set<number>;
	for (let i = 0; i < numCourses; ++i)
		rootIds.add(i);
	const nodes: Map<number, Node> = new Map();
	for (const item of prerequisites) {
		const destination = item[0];
		const source = item[1];
		if (null == destination || null == source)
			throw new Error('Need array of [destination,source] in prerequisites');

		let destinationNode = nodes.get(destination);
		if (!destinationNode) {
			destinationNode = new Node(destination);
			nodes.set(destination, destinationNode);
		}
		destinationNode.sourceCount += 1;

		let sourceNode = nodes.get(source);
		if (!sourceNode) {
			sourceNode = new Node(source);
			nodes.set(source, sourceNode);
		}
		sourceNode.destinations.add(destinationNode);
		rootIds.delete(destination);
	}
	for (const rootId of rootIds)
		roots.set(rootId, nodes.get(rootId) || new Node(rootId));
	return nodes;
}

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	const roots: Map<number, Node> = new Map();
	const nodes = buildNodes(numCourses, prerequisites, roots);
	const sortedItems: number[] = [];
	while (roots.size) {
		const [root] = roots;
		if (null == root)
			throw new Error('Need first element from roots');
		const rootId = root[0];
		roots.delete(rootId);
		sortedItems.push(rootId);
		const sourceNode = nodes.get(rootId);
		if (!sourceNode)
			continue;
		for (const destinationNode of sourceNode.destinations) {
			destinationNode.sourceCount -= 1;
			if (destinationNode.sourceCount <= 0)
				roots.set(destinationNode.id, destinationNode);
		}
		sourceNode.destinations.clear();
	}
	if (sortedItems.length !== numCourses)
		return [];
	return sortedItems;
}

const numCourses = 6, prerequisites = [[2,3],[1,2],[0,1],[0,4],[4,5],[5,1]];
console.log(findOrder(numCourses, prerequisites));