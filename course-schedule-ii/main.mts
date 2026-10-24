function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	const roots = new Set<number>(new Array(numCourses).fill(0).map((_, index) => index));
	/** Map from source to destinations */
	const links: Map<number, Set<number>> = new Map();
	for (const item of prerequisites) {
		const destination = item[0];
		const source = item[1];
		if (null == destination || null == source)
			throw new Error('Need array of [destination,source] in prerequisites');
		let destinations = links.get(source);
		if (!destinations) {
			destinations = new Set();
			links.set(source, destinations);
		}
		destinations.add(destination);
		roots.delete(destination);
	}
	const sortedItems: number[] = [];
	while (roots.size) {
		const [root] = roots;
		if (null == root)
			throw new Error('Need first element from roots');
		roots.delete(root);
		sortedItems.push(root);
		const destinations = links.get(root);
		if (!destinations)
			continue;
		for (const destination of Array.from(destinations)) {
			destinations.delete(destination);
			let hasSources = false;
			for (const link of links) {
				if (link[1]?.has(destination))
					hasSources = true;
					break;
			}
			if (!hasSources)
				roots.add(destination);
		}
	}
	if (sortedItems.length !== numCourses)
		return [];
	return sortedItems;
}

const numCourses = 6, prerequisites = [[2,3],[1,2],[0,1],[0,4],[4,5],[5,1]];
console.log(findOrder(numCourses, prerequisites));