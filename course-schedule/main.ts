enum Status {
	FRESH,
	TEMPORARY,
	PERMANENT
}

class Node {
	readonly sources: Node[] = [];
	status: Status = Status.FRESH;

	constructor(readonly id: number) {
	}
}

function findLoop(node: Node) {
	if (node.status === Status.PERMANENT)
		return false;
	if (node.status === Status.TEMPORARY)
		return true;
	node.status = Status.TEMPORARY;
	for (const source of node.sources)
		if (findLoop(source))
			return true;
	node.status = Status.PERMANENT;
}

function findLoops(nodes: Node[]): boolean {
	for (const node of nodes) {
		if (node.status === Status.FRESH)
			if (findLoop(node))
				return true;
	}
	return false;
}

function buildNodeMap(prerequisites: number[][]) {
	const map = new Map<number, Node>();
	for (const link of prerequisites) {
		const id = link[0];
		const sourceId = link[1];
		let node = map.get(id);
		if (!node) {
			node = new Node(id);
			map.set(id, node);
		}
		let sourceNode = map.get(sourceId);
		if (!sourceNode) {
			sourceNode = new Node(sourceId);
			map.set(sourceId, sourceNode);
		}
		node.sources.push(sourceNode);
	}
	return map;
}

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
	if (prerequisites.length === 0)
		return true;
	const map = buildNodeMap(prerequisites);
	const nodes = Array.from(map.values());
	return !findLoops(nodes);
}


export const canFinishPublic = canFinish;

if (import.meta.main) {
	const numCourses = 3, prerequisites = [[0,2],[1,2],[2,0]];
	console.log(canFinish(numCourses, prerequisites));
}
