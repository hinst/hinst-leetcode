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
			for (const item of links) {
				if (item[1]?.has(destination))
					hasSources = true;
					break;
			}
			if (!hasSources)
				roots.add(destination);
		}
	}
	return sortedItems;
}

const numCourses = 8, prerequisites = [[1,0],[2,6],[1,7],[5,1],[6,4],[7,0],[0,5]];
console.log(findOrder(numCourses, prerequisites));