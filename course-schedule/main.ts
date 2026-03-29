function hasLoop(id: number, visitedNodes: Set<number>, map: Map<number, number[]>): boolean {
	if (visitedNodes.has(id))
		return true;
	visitedNodes.add(id);
	const sources = map.get(id);
	if (!sources)
		return false;
	for (const source of sources) {
		if (hasLoop(source, visitedNodes, map))
			return true;
	}
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
	let numCourses = 2, prerequisites = [[1,0]];
	console.log(canFinish(numCourses, prerequisites));
	numCourses = 2, prerequisites = [[1,0],[0,1]];
	console.log(canFinish(numCourses, prerequisites));
}
