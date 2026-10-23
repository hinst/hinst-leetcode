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

	const visited = new Set<number>();
	const queue: number[] = [];
	function add(item: number) {
		if (visited.has(item))
			return;
		visited.add(item);
		queue.push(item);
		const row = links[item];
		if (!row)
			throw new Error('Missing links[' + item + ']');
		for (let i = 0; i < row.length; ++i)
			if (row[i])
				add(i);
	}
	for (const root of roots) {
		add(root);
	}
	return queue;
}

// const numCourses = 2, prerequisites = [[1,0]];
const numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]];
console.log(findOrder(numCourses, prerequisites));