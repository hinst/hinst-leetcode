function hasLoop(visitedNodes: Set<number>, node: Node): boolean {
	if (visitedNodes.has(node.id))
		return true;
	visitedNodes.add(node.id);
	for (const source of node.sources) {
		if (hasLoop(visitedNodes, source))
			return true;
	}
	visitedNodes.delete(node.id);
	return false;
}

class Node {
	readonly sources: Node[] = [];
	readonly targets: Node[] = [];
	groupIndex: number = -1;

	constructor(readonly id: number) {
	}
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
		sourceNode.targets.push(node);
	}
	return map;
}

function buildGroup(groupIndex: number, group: Node[], node: Node) {
	if (node.groupIndex >= 0)
		return;
	node.groupIndex = groupIndex;
	group.push(node);
	for (const source of node.sources)
		buildGroup(groupIndex, group, source);
	for (const target of node.targets)
		buildGroup(groupIndex, group, target);
}

function buildGroups(nodes: Node[]): Node[][] {
	const groups: Node[][] = [];
	for (const node of nodes) {
		if (node.groupIndex >= 0)
			continue;
		const group: Node[] = [];
		const groupIndex = groups.length;
		groups.push(group);
		buildGroup(groupIndex, group, node);
	}
	return groups;
}

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
	if (prerequisites.length === 0)
		return true;
	const map = buildNodeMap(prerequisites);
	const nodes = Array.from(map.values());
	const groups = buildGroups(nodes);
	for (const group of groups) {
		let hasRoot = false;
		for (const node of group) {
			if (node.targets.length === 0) {
				hasRoot = true;
				if (hasLoop(new Set(), node))
					return false;
			}
		}
		if (!hasRoot)
			return false;
	}
	return true;
}


export const canFinishPublic = canFinish;

if (import.meta.main) {
	const numCourses = 5, prerequisites = [[1,4],[2,4],[3,1],[3,2]];
	console.log({prerequisites});
	console.log(canFinish(numCourses, prerequisites));
}
