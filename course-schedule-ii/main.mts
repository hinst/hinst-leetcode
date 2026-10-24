class Node {
	sourceCount: number = 0;
	destinations: Set<number> = new Set();
}

function buildNodes(numCourses: number, prerequisites: number[][], roots: Set<number>): Map<number, Node> {
	for (let i = 0; i < numCourses; ++i)
		roots.add(i);
	const nodes: Map<number, Node> = new Map();
	for (const item of prerequisites) {
		const destination = item[0];
		const source = item[1];
		if (null == destination || null == source)
			throw new Error('Need array of [destination,source] in prerequisites');

		let sourceNode = nodes.get(source);
		if (!sourceNode) {
			sourceNode = new Node();
			nodes.set(source, sourceNode);
		}
		sourceNode.destinations.add(destination);
		roots.delete(destination);

		let destinationNode = nodes.get(destination);
		if (!destinationNode) {
			destinationNode = new Node();
			nodes.set(destination, destinationNode);
		}
		destinationNode.sourceCount += 1;
	}
	return nodes;
}

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	const roots: Set<number> = new Set();
	const nodes = buildNodes(numCourses, prerequisites, roots);
	const sortedItems: number[] = [];
	while (roots.size) {
		const [root] = roots;
		if (null == root)
			throw new Error('Need first element from roots');
		roots.delete(root);
		sortedItems.push(root);
		const sourceNode = nodes.get(root);
		if (!sourceNode)
			continue;
		const destinationsArray = Array.from(sourceNode.destinations);
		sourceNode.destinations.clear();
		for (const destination of destinationsArray) {
			const destinationNode = nodes.get(destination);
			if (!destinationNode)
				continue;
			destinationNode.sourceCount -= 1;
			if (destinationNode.sourceCount <= 0)
				roots.add(destination);
		}
	}
	if (sortedItems.length !== numCourses)
		return [];
	return sortedItems;
}

const numCourses = 6, prerequisites = [[2,3],[1,2],[0,1],[0,4],[4,5],[5,1]];
console.log(findOrder(numCourses, prerequisites));