function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	const roots = new Set<number>(new Array(numCourses).fill(0).map((_, index) => index));
	/** If links[A][B] is true then A leads to B */
	const links: boolean[][] = [];
	for (let i = 0; i < numCourses; ++i)
		links.push(new Array(numCourses));
	for (const item of prerequisites) {
		const b = item[0];
		const a = item[1];
		if (null == a || null == b)
			throw new Error('Need arrays with two items in prerequisites');
		const row = links[a];
		if (!row)
			throw new Error('Missing links[' + a + ']');
		row[b] = true;
		roots.delete(b);
	}
	if (!roots.size)
		return [];

	const queue = new Array(numCourses).fill(0).map((_, index) => ({index, distance: -1}));
	let items = Array.from(roots);
	let visited = new Set<string>();
	for (let waveIndex = 0; items.length; ++waveIndex) {
		const itemsKey = items.join(',');
		if (visited.has(itemsKey))
			return [];
		visited.add(itemsKey);
		const nextItems: number[] = [];
		for (const item of items) {
			const step = queue[item];
			if (!step)
				throw new Error('Missing queue[' + item + ']');
			if (step.distance > waveIndex)
				return [];
			step.distance = waveIndex;
			const row = links[item];
			if (!row)
				throw new Error('Missing links[' + items + ']');
			for (let i = 0; i < row.length; ++i)
				if (row[i])
					nextItems.push(i);
		}
		items = nextItems;
	}
	queue.sort((a, b) => a.distance - b.distance);
	if (queue.some(item => item.distance === -1))
		return [];
	return queue.map(step => step.index);
}

const numCourses = 8, prerequisites = [[1,0],[2,6],[1,7],[5,1],[6,4],[7,0],[0,5]];
console.log(findOrder(numCourses, prerequisites));