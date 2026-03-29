function hasLoop(id: number, visitedNodes: Set<number>, map: Map<number, number[]>): boolean {
	if (visitedNodes.has(id))
		return true;
	const sources = map.get(id);
	if (!sources)
		return false;
	visitedNodes.add(id);
	for (const source of sources) {
		if (hasLoop(source, visitedNodes, map))
			return true;
	}
	visitedNodes.delete(id);
	return false;
}

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
	const map = new Map<number, number[]>();
	for (const link of prerequisites) {
		const id = link[0];
		const sourceId = link[1];
		let sources = map.get(id);
		if (!sources) {
			sources = [];
			map.set(id, sources);
		}
		sources.push(sourceId);
	}
	for (const id of map.keys()) {
		if (hasLoop(id, new Set(), map))
			return false;
	}
	return true;
}


export const canFinishPublic = canFinish;

if (import.meta.main) {
	const numCourses = 5, prerequisites = [[1,4],[2,4],[3,1],[3,2]];
	console.log(canFinish(numCourses, prerequisites));
}
