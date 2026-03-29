function buildLevel(level: number, nodes: Node[]): boolean {
	if (nodes.length === 0)
		return true;
	const nextNodes: Node[] = [];
	for (const node of nodes) {
		if (node.level === -1 || node.level > level)
			node.level = level;
		else
			return false;
		nextNodes.push(node);
	}
	if (nextNodes.length === 0)
		return true;
	return buildLevel(level + 1, nextNodes);
}

class Node {
	readonly sources: Node[] = [];
	readonly targets: Node[] = [];
	groupIndex: number = -1;
	level: number = -1;

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
		const leafs = group.filter(item => item.targets.length === 0);
		if (leafs.length === 0)
			return false;
		return buildLevel(0, leafs);
	}
	return true;
}


export const canFinishPublic = canFinish;

if (import.meta.main) {
	const numCourses = 3, prerequisites = [[0,2],[1,2],[2,0]];
	console.log(canFinish(numCourses, prerequisites));
}
